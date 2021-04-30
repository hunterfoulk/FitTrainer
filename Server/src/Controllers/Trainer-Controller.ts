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
		let Appointments = await Query(Statements.Get.Appointments(TrainerId))
		console.log("res", clients)
		resolver(res, 200, 'Clients Returned', { clients: clients, AccountInfo: AccountInfo[0], role: TrainerRole, TodaysClients: TodaysClients, Appointments: Appointments })

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

	resolver(res, 200, 'Exercise List Returned', { exerciseList: exerciseList, AccountInfo: AccountInfo[0], role: "Trainer", workouts: workouts })

}


// SCHEDULE //
export const Schedule = async (req: Request, res: Response,) => {
	const trainer = res.locals
	const TrainerId = trainer.TrainerId
	console.log("AccountInfo fireddd")
	console.log("LOCALS VAR", trainer)


	let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))
	let TrainersClients = await Query(Statements.Get.AllTrainersClients(TrainerId))
	let Appointments = await Query(Statements.Get.Appointments(TrainerId))

	resolver(res, 200, 'Exercise List Returned', { AccountInfo: AccountInfo[0], role: "Trainer", Appointments: Appointments, TrainersClients: TrainersClients })

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
		let gym = decoded.gym
		let trainer = decoded.trainer
		if (!decoded) {
			console.log("BAD TOKEN")

		}

		else if (trainer) {
			console.log("decoded ID TRAINER", decoded.trainer)
			res.locals = trainer
			next()
		} else {
			console.log("decoded ID GYM", decoded.trainer)
			res.locals = gym
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

			const tPayload = new Trainer(TrainerId, email, 'Trainer')
			const trainerToken = createTrainerToken(tPayload)
			// const accessToken = createAccessToken(tPayload)

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
	const { email, password, gymName } = req.body
	console.log({ body: req.body })
	console.log("GYM NAME", gymName)
	Query(Statements.Get.Register(email))
		.then(async (getResults) => {
			const trainerFound = getResults.length > 0

			if (trainerFound) return resolver(res, 409, 'Gym Already Exists')
			console.log({ trainerFound: trainerFound })

			const hashedPass = await bcryptHash(password)
			const joinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

			Query(Statements.Post.Register(email, hashedPass, joinDate, gymName))
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
// let accountName = "fittrainer"
// const sharedKeyCredential = new StorageSharedKeyCredential(
// 	'fittrainer',
// 	'AYQimv122pTLcHo9bjLojyGwDRKFaMgrf+qwtZw2VqEh+3AtamJUH2/VEppKar4yzBLB2K+z41PZo+ckkPUrGw==');
// const pipeline = newPipeline(sharedKeyCredential);

// const blobServiceClient = new BlobServiceClient(
// 	`https://${accountName}.blob.core.windows.net`,
// 	pipeline
// );

// const container = 'fit-trainer';
// const ONE_MEGABYTE = 1024 * 1024;
// const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };


const getBlobName = originalName => {
	// Use a random number to generate a unique file name, 
	// removing "0." from the start of the string.
	const identifier = Math.random().toString().replace(/0\./, '');
	return `${identifier}-${originalName}`;
};
interface MulterRequest extends Request {
	files: any;
}

export const TrainerCreateClient = async (req: MulterRequest, res: Response): Promise<void> => {
	const { gymId, trainerId, email, firstName, lastName, birthday, mobile, goal } = req.body;
	console.log({ body: req.body })
	console.log(typeof gymId)
	let GymId = Math.floor(gymId)
	let TrainerId = Math.floor(trainerId)
	let accountName = "fittrainer"
	const sharedKeyCredential = new StorageSharedKeyCredential(
		'fittrainer',
		'AYQimv122pTLcHo9bjLojyGwDRKFaMgrf+qwtZw2VqEh+3AtamJUH2/VEppKar4yzBLB2K+z41PZo+ckkPUrGw==');
	const pipeline = newPipeline(sharedKeyCredential);

	const blobServiceClient = new BlobServiceClient(
		`https://${accountName}.blob.core.windows.net`,
		pipeline
	);

	const container = 'fit-trainer';
	const ONE_MEGABYTE = 1024 * 1024;
	const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

	const JoinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

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
		await Query(Statements.Post.CreateClient(email, firstName, lastName, JoinDate, birthday, mobile, goal, GymId, TrainerId, avatarUrl));

		resolver(res, 200, 'Client Created Succesfully!', { Results: [] })

	} catch (err) {
		console.log(`ERROR IN AVATAR UPLOAD: ${err.message}`);
		resolver(res, 503, 'Database Error')

	}


}



export const CreateAppointment = async (req: MulterRequest, res: Response): Promise<void> => {
	try {
		const { payload } = req.body
		console.log("BODY", payload)

		const clientName = await Query(Statements.Post.getClientName(payload.ClientId));

		const firstName = clientName[0].FirstName.charAt(0).toUpperCase() + clientName[0].FirstName.slice(1);
		const lastName = clientName[0].LastName.charAt(0).toUpperCase() + clientName[0].LastName.slice(1);
		const title = firstName.concat(" ", lastName)

		const newAppointment = await Query(Statements.Post.CreateAppointment(title, payload.startDate, payload.endDate, payload.ClientId, payload.TrainerId));
		const newlyCreatedAppointment = await Query(Statements.Get.GetNewAppointment(newAppointment.insertId));
		const appointmentData = newlyCreatedAppointment[0]

		console.log("NEW APPOINTMENT", appointmentData)
		resolver(res, 200, 'Sending New Appointment Back.', appointmentData)

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
	const { TrainerId, exercises, workout_name } = req.body
	// console.log("DATA", JSON.stringify(exercises))
	let arr = JSON.stringify(exercises)
	console.log("ARR", arr)

	const JoinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

	await Query(Statements.Post.CreateNewWorkout(TrainerId, arr, workout_name, JoinDate))


	console.log(AccountInfo)
	resolver(res, 200, 'Workouit Created Succesfull.', {})

}