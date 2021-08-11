import { Router } from 'express'
import * as trainerController from '../Controllers/Trainer-Controller'
import { Auth } from "../Controllers/Trainer-Controller"
import { Request, Response } from 'express'

export default function userRouter(router: Router): void {
	console.log("ROUTER FIREDDDD")

	router.route('/dashboard').get(Auth, (req: Request, res: Response): void => {

		trainerController.Dashboard(req, res)
	})

	router.route('/trainersPrograms').get(Auth, (req: Request, res: Response): void => {
		trainerController.Programs(req, res)
	})
	router.route('/getWorkouts').get(trainerController.TrainersWorkouts)

	router.route('/accountInfo').get(Auth, (req: Request, res: Response): void => {
		trainerController.AccountInfo(req, res)
	})

	router.route('/schedule').get(Auth, (req: Request, res: Response): void => {
		trainerController.Schedule(req, res)
	})

	router.route('/clientsRoute').get(Auth, (req: Request, res: Response): void => {
		trainerController.ClientsRoute(req, res)
	})

	router.route('/appointmentsPage').get(Auth, (req: Request, res: Response): void => {
		trainerController.AppointmentsPage(req, res)
	})

	router.route('/createWorkout').post(trainerController.CreateWorkout)

	router.route('/deleteWorkout').post(trainerController.DeleteWorkout)

	router.route('/editProfile').post(trainerController.EditProfile)

	router.route('/deleteClient').post(trainerController.DeleteClient)

	router.route('/logout').get(trainerController.Logout)

	router.route('/trainerLogin').post(trainerController.trainerLogin)

	router.route('/trainerSignup').post(trainerController.TrainerSignup)

	router.route('/gymLogin').post(trainerController.gymLogin)

	router.route('/register').post(trainerController.Register)

	router.route('/createAppointment').post(trainerController.CreateAppointment)

	router.route('/createNewClient').post(trainerController.TrainerCreateClient)

	router.route('/deleteAppointment').post(trainerController.DeleteNewAppointment)

	router.route('/updateWorkout').post(trainerController.EditWorkout)

	router.route('/updateAppointment').post(trainerController.UpdateAppointment)

	router.route('/updateAppointmentWorkout').post(trainerController.EditAppointmentWorkout)

	router.route('/deleteWorkoutFromAppointment').post(trainerController.DeleteWorkoutFromAppointment)

	router.route('/createNewExercise').post(trainerController.CreateNewExercise)

	router.route('/updateAppointmentCompletedStatus').post(trainerController.UpdateAppointmentCompletedStatus)

	router.route('/test').post(trainerController.Test)







}