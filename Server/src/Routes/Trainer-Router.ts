import { Router } from 'express'
import * as trainerController from '../Controllers/Trainer-Controller'
import { Auth } from "../Controllers/Trainer-Controller"
import { Request, Response } from 'express'
// const multer = require('multer')
// const inMemoryStorage = multer.memoryStorage();
// const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');


export default function userRouter(router: Router): void {
	console.log("ROUTER FIREDDDD")

	router.route('/dashboard').get(Auth, (req: Request, res: Response): void => {
		trainerController.Dashboard(req, res)
	})

	router.route('/logout').get(trainerController.Logout)

	router.route('/trainerLogin').post(trainerController.trainerLogin)

	router.route('/trainerSignup').post(trainerController.TrainerSignup)

	router.route('/gymLogin').post(trainerController.gymLogin)

	router.route('/register').post(trainerController.Register)

	router.route('/createAppointment').post(trainerController.CreateAppointment)

	router.route('/createNewClient').post(trainerController.TrainerCreateClient)


	// router.route('/user-auth')
	// 	.get(trainerController.ValidateToken)

}