import Trainer from '../Models/Trainer'
import Gym from '../Models/Gym'
import Query, { statements as Statements } from '../Utils/Statements'
import resolver from '../Utils/Resolver'

import * as jwt from 'jsonwebtoken'
import { bcryptCompare, bcryptHash } from '../Utils/Bcrypt'
import {
	createAccessToken, createTrainerToken,
	sendTrainerCookie, revokeTrainerCookie as revokeTrainerCookie
} from '../Utils/Tokens'
import { Request, Response } from 'express'
import { Console } from 'node:console'


const {
	BlobServiceClient,
	StorageSharedKeyCredential,
	newPipeline
} = require('@azure/storage-blob');
const getStream = require('into-stream');


interface IDecoded extends Request {
	decoded: string;
	trainer?: {
		TrainerId: number
		Email: string
	}
	gym?: {
		TrainerId: number
		Email: string
	}
}





export const Dashboard = async (req: Request, res: Response,) => {
	console.log("DASHBOARD FUNC FIRED")
	const trainer = res.locals
	const TrainerId = trainer.TrainerId
	const TrainerRole = trainer.Role
	const GymId = trainer.GymId
	const GymRole = trainer.Role


	if (trainer.Role === "Trainer") {
		console.log("TRAINER IN IF", trainer)
		await Query(Statements.Update.TrainerLogIn(TrainerId))
		let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))
		let clients = await Query(Statements.Get.AllTrainersClients(TrainerId))
		let TodaysClients = await Query(Statements.Get.TrainersTodaysClients())






		resolver(res, 200, 'Clients Returned', { clients: clients, AccountInfo: AccountInfo[0], role: TrainerRole, TodaysClients: TodaysClients })

	} else {
		console.log("Gyms IN IF", trainer)
		console.log("GYM IDDDD:", GymId)
		await Query(Statements.Update.GymLogIn(GymId))
		let trainers = await Query(Statements.Get.AllGymsTrainers(GymId))
		let AccountInfo = await Query(Statements.Get.GymAccount(GymId))

		console.log("TRAINERS:", trainers)
		resolver(res, 200, 'Gyms Returned', { trainers: trainers, AccountInfo: AccountInfo[0], role: GymRole, })
	}

}

// Programs //
export const Programs = async (req: Request, res: Response,) => {
	let exerciseList = await Query(Statements.Get.GetExercises())
	const trainer = res.locals
	const TrainerId = trainer.TrainerId
	console.log("AccountInfo fireddd")
	console.log("LOCALS VAR", trainer)


	let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))
	let workouts = await Query(Statements.Get.GetTrainersWorkouts(TrainerId))

	for (const x of workouts) {
		let workout_exercise = await Query(Statements.Get.SelectWorkoutExercises(x.WorkoutId))

		if (x.WorkoutId == workout_exercise[0].w_Id) {
			x.exercises = workout_exercise
		}
	}

	console.log("NEW WORKOUTS:", workouts)


	let muscle_groups = await Query(Statements.Get.GetMuscleGroups())
	let equipment = await Query(Statements.Get.GetEquipment())

	resolver(res, 200, 'Exercise List Returned', { exerciseList: exerciseList, AccountInfo: AccountInfo[0], role: "Trainer", workouts: workouts, muscle_groups: muscle_groups, equipment: equipment })

}

export const TrainersWorkouts = async (req: Request, res: Response,) => {
	const { TrainerId } = req.query as any
	console.log("TRIANER IDDD", TrainerId)
	let workouts = await Query(Statements.Get.GetTrainersPrograms(TrainerId))
	console.log("WORKOUTS", workouts)

	resolver(res, 200, 'Workouts List Returned', { workouts: workouts })

}


// SCHEDULE //
export const Schedule = async (req: Request, res: Response,) => {
	const trainer = res.locals
	const TrainerId = trainer.TrainerId
	console.log("AccountInfo fireddd")
	console.log("LOCALS VAR", trainer)



	let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))
	let TrainersClients = await Query(Statements.Get.GetTrainersClients(TrainerId))
	let Appointments = await Query(Statements.Get.Appointments(TrainerId))
	let workouts = await Query(Statements.Get.GetWorkoutsForAppointmentsJoin(TrainerId))
	for (let x of Appointments) {
		if (x.WorkoutId !== null) {
			let newObj = JSON.parse(x.workout)
			x.workout = newObj

		}
	}




	resolver(res, 200, 'Exercise List Returned', { AccountInfo: AccountInfo[0], role: "Trainer", Appointments: Appointments, TrainersClients: TrainersClients, workouts: workouts })

}


const TRAINER_SECRET = process.env.JWT_TRAINER_SECRET
export const Logout = async (req, res) => {
	console.log("log out fired")
	revokeTrainerCookie(res)


}

export const Auth = (req: Request, res: Response, next): void => {
	console.log("AUTH MIDDLEWARE FIRED.")
	const trainerCookie = req.cookies['_ftTrainerAuth']
	console.log("cookie in auth", trainerCookie)

	if (trainerCookie === undefined) return
	if (Object.keys(trainerCookie).length <= 0) return resolver(res, 400, 'No Cookies', null)

	jwt.verify(trainerCookie, TRAINER_SECRET, { issuer: 'FT-Server' }, async (err, decoded: IDecoded) => {

		console.log("FIRED OFF!", decoded)
		if (err && !decoded) {
			console.log("TOKEN ERROR", err) //token expired error handler.

			revokeTrainerCookie(res)


		}

		if (!decoded && !err) {
			console.log("BAD TOKEN")
			revokeTrainerCookie(res)

		}


		if (decoded) {
			let trainer = decoded.trainer
			console.log("decoded ID TRAINER", decoded.trainer)
			res.locals = trainer
			next()
		}

	})
}




export const trainerLogin = (req: Request, res: Response): void => {
	const { email, password } = req.body
	console.log({ body: req.body })
	Query(Statements.Get.trainerLogin(email))
		.then(async (results) => {
			const trainerFound = results.length > 0

			if (!trainerFound) return resolver(res, 400, 'No Account Found')

			console.log(results);

			const { TrainerId, Password: hashedPass } = results[0]
			const passedComparison = await bcryptCompare(password, hashedPass)

			if (!passedComparison) return resolver(res, 401, 'Password Incorrect')
			console.log({ passedComparison })

			// const accessToken = createAccessToken(tPayload)
			const tPayload = new Trainer(TrainerId, email, 'Trainer')
			const trainerToken = createTrainerToken(tPayload)

			sendTrainerCookie(res, trainerToken)
			resolver(res, 200, 'Authenticated', { TrainerId })
		})
		.catch(error => {
			console.error(error)
			resolver(res, 503, 'Database Error')
		})
}



export const gymLogin = (req: Request, res: Response): void => {
	const { email, password } = req.body
	console.log({ body: req.body })
	Query(Statements.Get.gymLogin(email))
		.then(async (results) => {
			const gymFound = results.length > 0

			if (!gymFound) return resolver(res, 400, 'No Account Found')

			console.log(results);


			const { GymId, Password: hashedPass } = results[0]
			const passedComparison = await bcryptCompare(password, hashedPass)

			if (!passedComparison) return resolver(res, 401, 'Password Incorrect')
			console.log({ passedComparison })

			const gPayload = new Gym(GymId, email, 'Gym')
			const gymToken = createTrainerToken(gPayload)
			// const accessToken = createAccessToken(tPayload)

			sendTrainerCookie(res, gymToken)
			resolver(res, 200, 'Authenticated', { GymId })
		})
		.catch(error => {
			console.error(error)
			resolver(res, 503, 'Database Error')
		})
}






export const Register = (req: Request, res: Response): void => {
	const { email, password, firstName, lastname, phone } = req.body
	console.log({ body: req.body })
	Query(Statements.Get.Register(email))
		.then(async (getResults) => {
			const trainerFound = getResults.length > 0

			if (trainerFound) return resolver(res, 409, 'Gym Already Exists')
			console.log({ trainerFound: trainerFound })

			const hashedPass = await bcryptHash(password)
			const joinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

			Query(Statements.Post.Register(email, hashedPass, joinDate, phone, lastname, firstName))
				.then((postResults) => {
					resolver(res, 200, 'Account Created', { trainerId: postResults.insertId })
				})
				.catch((postError) => {
					console.error(postError)
					resolver(res, 503, 'Database Error')
				})
		})
		.catch(trainerErr => {
			console.error(trainerErr)
			resolver(res, 503, 'Database Error')
		})
}



export const TrainerSignup = (req: Request, res: Response): void => {
	const { GymId, Email, Password, FirstName, LastName, Birthday } = req.body
	console.log({ body: req.body })

	Query(Statements.Get.Register(Email))
		.then(async (getResults) => {
			const trainerFound = getResults.length > 0

			if (trainerFound) return resolver(res, 409, 'Trainer Email Already Exists')
			console.log({ trainerFound: trainerFound })

			const hashedPass = await bcryptHash(Password)
			const joinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

			Query(Statements.Post.trainerSignup(Email, hashedPass, joinDate, FirstName, LastName, Birthday, GymId))
				.then((postResults) => {
					resolver(res, 200, 'Trainer Account Created', { trainerId: postResults.insertId })
				})
				.catch((postError) => {
					console.error(postError)
					resolver(res, 503, 'Database Error')
				})
		})
		.catch(trainerErr => {
			console.error(trainerErr)
			resolver(res, 503, 'Database Error')
		})
}


const getBlobName = originalName => {
	// Use a random number to generate a unique file name, 
	// removing "0." from the start of the string.
	const identifier = Math.random().toString().replace(/0\./, '');
	return `${identifier}-${originalName}`;
};
interface MulterRequest extends Request {
	files: any;
}



export const EditProfile = async (req: MulterRequest, res: Response): Promise<void> => {
	const { firstname, email, lastname, mobile, avatar, id } = req.body;
	console.log("AVATAR", avatar)
	console.log("FILES", req.files.avatar)
	let Avatar = req.files.avatar
	console.log("avatar yo", Avatar)
	if (req.files.avatar === undefined) {
		console.log("no files yo")
		await Query(Statements.Update.UpdateProfileWithoutAvatar(email, firstname, lastname, mobile, id));
		let TrainerId = id
		const AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId));
		resolver(res, 200, 'Client Created Succesfully!', { AccountInfo: AccountInfo[0] })

	} else {
		console.log("ELSE")
		/////////////////////////////////////////////////////////////////////////////////////
		let accountName = "fittrainerstorage"



		const sharedKeyCredential = new StorageSharedKeyCredential(
			'fittrainerstorage',
			'R3DC3z3ioYPvK5AcEzIchvxOGBUkGnpg9p67gUa120eiDzOBU6lkkixxiQ8k82z68PF/BFjeFFbeMGCfsD6Zbw==');
		const pipeline = newPipeline(sharedKeyCredential);

		const blobServiceClient = new BlobServiceClient(
			`https://fittrainerstorage.blob.core.windows.net`,
			pipeline
		);

		const container = 'fit-container';
		const ONE_MEGABYTE = 1024 * 1024;
		const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };


		const blobName = req.files.avatar.name;
		const stream = getStream(req.files.avatar.data);
		const containerClient = blobServiceClient.getContainerClient(container);
		const blockBlobClient = containerClient.getBlockBlobClient(blobName);

		try {

			await blockBlobClient.uploadStream(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
			let avatarUrl = blockBlobClient.url
			console.log("AVATAR URL:", avatarUrl)

			await Query(Statements.Update.UpdateProfileWithAvatar(email, firstname, lastname, mobile, id, avatarUrl));
			let TrainerId = id
			const AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId));
			resolver(res, 200, 'Client Created Succesfully!', { AccountInfo: AccountInfo[0] })

		} catch (err) {
			console.log(`ERROR IN AVATAR UPLOAD: ${err.message}`);
			resolver(res, 503, 'Database Error')

		}

	}

}




export const TrainerCreateClient = async (req: MulterRequest, res: Response): Promise<void> => {
	const { trainerId, email, firstName, lastName, mobile, goal } = req.body;
	let accountName = "fittrainerstorage"
	let TrainerId = trainerId
	let avatar = req.files.avatar
	console.log("TRAINER ID", trainerId, email, avatar)

	const JoinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

	if (!avatar) {
		console.log("no avatar dawg")
		let defaultAvatar = "https://fittrainerstorage.blob.core.windows.net/fit-container/defaultavatar.png"
		let result = await Query(Statements.Post.CreateClient(email, firstName, lastName, JoinDate, mobile, goal, TrainerId, defaultAvatar));
		let ClientId = result.insertId
		let newClient = await Query(Statements.Get.NewClient(ClientId))
		resolver(res, 200, 'Client Created Succesfully!', { newClient: newClient[0] })


	} else if (avatar) {


		console.log("REQUEST HAS AVATAR")

		const sharedKeyCredential = new StorageSharedKeyCredential(
			'fittrainerstorage',
			'R3DC3z3ioYPvK5AcEzIchvxOGBUkGnpg9p67gUa120eiDzOBU6lkkixxiQ8k82z68PF/BFjeFFbeMGCfsD6Zbw==');
		const pipeline = newPipeline(sharedKeyCredential);

		const blobServiceClient = new BlobServiceClient(
			`https://fittrainerstorage.blob.core.windows.net`,
			pipeline
		);


		const container = 'fit-container';
		const ONE_MEGABYTE = 1024 * 1024;
		const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };


		const blobName = req.files.avatar.name;
		const stream = getStream(req.files.avatar.data);
		const containerClient = blobServiceClient.getContainerClient(container);
		const blockBlobClient = containerClient.getBlockBlobClient(blobName);

		try {

			await blockBlobClient.uploadStream(stream,
				uploadOptions.bufferSize, uploadOptions.maxBuffers,
				{ blobHTTPHeaders: { blobContentType: "image/jpeg" } });
			let avatarUrl = blockBlobClient.url
			console.log("AVATAR URL:", avatarUrl)

			let result = await Query(Statements.Post.CreateClient(email, firstName, lastName, JoinDate, mobile, goal, TrainerId, avatarUrl));
			let ClientId = result.insertId
			let newClient = await Query(Statements.Get.NewClient(ClientId))
			resolver(res, 200, 'Client Created Succesfully!', { newClient: newClient[0] })

		} catch (err) {
			console.log(`ERROR IN AVATAR UPLOAD: ${err.message}`);
			resolver(res, 503, 'Database Error')

		}
	}



}



export const CreateAppointment = async (req: MulterRequest, res: Response): Promise<void> => {


	try {
		const { payload } = req.body
		console.log("BODY", payload)

		const clientName = await Query(Statements.Post.getClientName(payload.ClientId));
		console.log("CLIENT NAME", clientName)
		if (!clientName) {
			resolver(res, 503, 'Client didnt set a first name.')
			return;

		} else {
			const firstName = clientName[0].FirstName.charAt(0).toUpperCase() + clientName[0].FirstName.slice(1);
			const lastName = clientName[0].LastName.charAt(0).toUpperCase() + clientName[0].LastName.slice(1);
			const title = firstName.concat(" ", lastName)

			const newAppointment = await Query(Statements.Post.CreateAppointment(title, payload.startDate, payload.endDate, payload.ClientId, payload.TrainerId));
			const newlyCreatedAppointment = await Query(Statements.Get.GetNewAppointment(newAppointment.insertId));
			const appointmentData = newlyCreatedAppointment[0]

			console.log("NEW APPOINTMENT", appointmentData)
			resolver(res, 200, 'Sending New Appointment Back.', appointmentData)
		}
	} catch (err) {
		console.log(err)
	}



}


export const UpdateAppointment = async (req: MulterRequest, res: Response): Promise<void> => {
	try {
		const { payload } = req.body
		let id = parseInt(payload.id)
		let endDate = payload.endDate
		let startDate = payload.startDate

		console.log("PAYLOAD", payload)
		await Query(Statements.Update.UpdateAppointmentDateTime(id, startDate, endDate));

		resolver(res, 200, 'Sending New Appointment Back.')

	} catch (err) {
		console.log(err)
	}
}



export const DeleteNewAppointment = async (req: MulterRequest, res: Response): Promise<void> => {
	try {
		const { id } = req.body
		await Query(Statements.Delete.DeleteAppointment(id));

		resolver(res, 200, 'Sending New Appointment Back.')

	} catch (err) {
		console.log(err)
	}
}


export const DeleteClient = async (req: MulterRequest, res: Response): Promise<void> => {
	try {
		const { ClientId } = req.body
		await Query(Statements.Delete.DeleteClient(ClientId));
		await Query(Statements.Delete.DeleteAppointmentsAfterClientDeleted(ClientId));

		resolver(res, 200, 'Deleted Client Succesfully')

	} catch (err) {
		console.log(err)
	}

}


export const DeleteWorkout = async (req: MulterRequest, res: Response): Promise<void> => {
	try {
		const { WorkoutId } = req.body
		await Query(Statements.Delete.DeleteWorkout(WorkoutId));
		await Query(Statements.Delete.DeleteWorkoutFromWorkoutExerciseTable(WorkoutId));

		resolver(res, 200, 'Deleted Workout Succesfully')

	} catch (err) {
		console.log(err)
	}

}

export const AccountInfo = async (req: Request, res: Response): Promise<void> => {

	const trainer = res.locals
	const TrainerId = trainer.TrainerId
	console.log("AccountInfo fireddd")
	console.log("LOCALS VAR", trainer)

	let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))

	console.log(AccountInfo)
	resolver(res, 200, 'Sending Account Info Back.', { AccountInfo: AccountInfo[0] })


}



export const CreateWorkout = async (req: Request, res: Response): Promise<void> => {

	const { TrainerId, exercises, workout_name, exerciseList } = req.body

	let arr = [...exercises]

	const JoinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
	console.log("payload", TrainerId, workout_name, exercises)
	if (!TrainerId || !exercises || !workout_name) return resolver(res, 409, 'No Data Selected')

	let results = await Query(Statements.Post.CreateNewWorkout(TrainerId, workout_name, JoinDate))
	let WorkoutId = results.insertId
	console.log("RESULTS ID:", results)


	for (const exercise of arr) {
		let ExerciseId = exercise.ExerciseId
		let reps = exercise.reps
		let sets = exercise.sets
		await Query(Statements.Post.InsertIntoWorkoutExercises(WorkoutId, ExerciseId, reps, sets))
	}

	let Workout = await Query(Statements.Get.GetMostRecentWorkoutWithExercises(TrainerId, WorkoutId))


	let Exercises = await Query(Statements.Get.SelectWorkoutExercises(WorkoutId))

	let _exercises = []
	for (const ex of Exercises) {

		const found = exerciseList.find(x => x.ExerciseId == ex.ex_Id)
		if (found) {
			_exercises.push(found)
		}
	}
	console.log("NEW ARR:", _exercises)


	let finalWorkout = Workout[0];
	finalWorkout.exercises = _exercises
	console.log("final workout", finalWorkout)


	resolver(res, 200, 'Workout Created Succesfull.', { workout: finalWorkout })


}


export const EditWorkout = async (req: Request, res: Response): Promise<void> => {

	const { WorkoutId, exercises, workout_name } = req.body
	console.log("ID", WorkoutId)
	let arr = JSON.stringify(exercises)

	// const JoinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

	await Query(Statements.Update.UpdateWorkout(WorkoutId, arr, workout_name))


	let workout = await Query(Statements.Get.GetCreatedWorkout(WorkoutId))


	console.log(AccountInfo)
	resolver(res, 200, 'Workouit Created Succesfull.', { workout: workout[0] })

}






export const ClientsRoute = async (req: Request, res: Response): Promise<void> => {
	const trainer = res.locals
	const TrainerId = trainer.TrainerId

	let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))
	let Clients = await Query(Statements.Get.GetTrainersClients(TrainerId))
	let recentAppointments = await Query(Statements.Get.GetRecentAppointments(TrainerId))

	Clients.forEach((client) => {
		client.thisWeeksWorkouts = 0
	})

	console.log("RECENTS", recentAppointments)

	for (let i = 0; i < Clients.length; i++) {
		let match = false
		for (let j = 0; j < recentAppointments.length; j++) {
			if (Clients[i].ClientId == recentAppointments[j].ClientId) {
				match = true
				console.log("MATCH", match)
				console.log("Client Name", Clients[i].FirstName)
				Clients[i].thisWeeksWorkouts++
			}
		}
		console.log("RAN")
	}


	resolver(res, 200, 'Sending Account Info Back.', { AccountInfo: AccountInfo[0], clients: Clients, role: "Trainer" })


}



export const EditAppointmentWorkout = async (req: Request, res: Response): Promise<void> => {

	const { WorkoutId, id } = req.body

	await Query(Statements.Update.UpdateAppointmentWorkout(WorkoutId, id))
	let Appointment = await Query(Statements.Get.GetNewAppointment(id))

	resolver(res, 200, 'Sending Appointment Info Back.', { Appointment: Appointment })


}

export const DeleteWorkoutFromAppointment = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.body
	await Query(Statements.Update.deleteWorkoutFromAppointment(id))
	let Appointment = await Query(Statements.Get.GetNewAppointment(id))

	resolver(res, 200, 'Sending Appointment Info Back.', { Appointment: Appointment })
}


export const CreateNewExercise = async (req: Request, res: Response): Promise<void> => {
	const { MuscleGroupId, EquipmentId, Name } = req.body
	console.log(MuscleGroupId, EquipmentId, Name)
	let _newExercise = await Query(Statements.Post.CreateNewExercise(MuscleGroupId, EquipmentId, Name))
	let ExerciseId = _newExercise.insertId
	let newExercise = await Query(Statements.Get.GetNewExercise(ExerciseId))

	resolver(res, 200, 'Sending Exercise Info Back.', { newExercise: newExercise[0] })


}


export const UpdateAppointmentCompletedStatus = async (req: Request, res: Response): Promise<void> => {
	const { id, status } = req.body
	console.log("STATUS:", status)
	if (status === true) {

		await Query(Statements.Update.UpdateAppointmentCompletedStatusTrue(id))
	} else if (status === false) {
		console.log("FALSE FIRED!!!")
		await Query(Statements.Update.UpdateAppointmentCompletedStatusFalse(id))
	}

	resolver(res, 200, 'Sending Appointment Info Back')


}

export const AppointmentsPage = async (req: Request, res: Response): Promise<void> => {
	const trainer = res.locals
	const TrainerId = trainer.TrainerId
	let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))
	let Appointments = await Query(Statements.Get.Appointments(TrainerId))
	let Workouts = await Query(Statements.Get.GetWorkoutsForAppointmentsJoin(TrainerId))
	let Exercises = await Query(Statements.Get.GetExercises())
	let TrainersClients = await Query(Statements.Get.GetTrainersClients(TrainerId))


	for (let x of Appointments) {
		if (x.WorkoutId !== null) {
			let newObj = JSON.parse(x.workout)
			x.workout = newObj

		}
	}


	console.log(Appointments)

	resolver(res, 200, 'Sending Exercise Info Back.', { AccountInfo: AccountInfo[0], Appointments: Appointments, Workouts: Workouts, TrainersClients: TrainersClients })


}


export const Test = async (req: Request, res: Response): Promise<void> => {
	console.log(req.body.startDate)
	console.log(req.body.endDate)


}
