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
	console.log("TRAINER ID FROM LOCALS", TrainerId)
	console.log("GYM ID FROM LOCALS", GymId)
	console.log("trainer route fired")

	if (trainer.Role === "Trainer") {
		console.log("TRAINER IN IF", trainer)
		await Query(Statements.Update.TrainerLogIn(TrainerId))
		let AccountInfo = await Query(Statements.Get.TrainerAccount(TrainerId))
		let clients = await Query(Statements.Get.AllTrainersClients(TrainerId))
		console.log("res", clients)
		resolver(res, 200, 'Clients Returned', { clients: clients, AccountInfo: AccountInfo[0], role: TrainerRole })

	} else {
		console.log("Gyms IN IF", trainer)
		await Query(Statements.Update.GymLogIn(GymId))
		let trainers = await Query(Statements.Get.AllGymsTrainers(GymId))
		let AccountInfo = await Query(Statements.Get.GymAccount(GymId))
		console.log("res", trainers)
		resolver(res, 200, 'Gyms Returned', { trainers: trainers, AccountInfo: AccountInfo[0], role: GymRole })
	}

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




