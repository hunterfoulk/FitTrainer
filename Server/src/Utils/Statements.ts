import DB from '../Database/MySQL'
import SQL, { SQLStatement } from 'sql-template-strings'

export const statements = {
	Get: {

		AllTrainersClients: (TrainerId
		): SQLStatement => SQL`
			SELECT * 
			FROM Trainers WHERE TrainerId = ${TrainerId}
		`,

		AllGymsTrainers: (GymId
		): SQLStatement => SQL`
			SELECT * 
			FROM trainers WHERE GymId = ${GymId}
		`,
		gymLogin: (
			email: string
		): SQLStatement => SQL`
			SELECT GymId, Email, Password
			FROM gyms
			WHERE email LIKE BINARY ${email}
		`,
		GymAccount: (
			GymId: number
		): SQLStatement => SQL`
			SELECT GymId, Email, GymName, Avatar, JoinDate
			FROM gyms
			WHERE GymId = ${GymId}
		`,
		TrainerAccount: (
			TrainerId: number
		): SQLStatement => SQL`
			SELECT GymId, Email, FirstName, LastName, Avatar, JoinDate, TrainerId
			FROM trainers
			WHERE TrainerId = ${TrainerId}
		`,
		trainerLogin: (
			email: string
		): SQLStatement => SQL`
			SELECT TrainerId, Email, Password
			FROM trainers
			WHERE email LIKE BINARY ${email}
		`,

		Register: (
			email: string
		): SQLStatement => SQL`
			SELECT Email
			FROM Trainers
			WHERE Email = ${email}
		`,
		TrainersTodaysClients: (
		): SQLStatement => SQL`
			SELECT *
			FROM clients
			
		`,
		RefreshValidation: (
		): SQLStatement => SQL`
		
		`,
		Appointments: (
			TrainerId: number,
		): SQLStatement => SQL`
			SELECT *
			FROM appointments
			WHERE TrainerId = ${TrainerId}
		`,
	},
	Post: {
		Register: (
			email: string,
			hashedPass: string,
			joinDate: string,
			GymName: string
		): SQLStatement => SQL`
			INSERT INTO Gyms
			(Email, Password, JoinDate, GymName)
			VALUES (${email}, ${hashedPass}, ${joinDate}, ${GymName})
		`,
		trainerSignup: (
			email: string,
			hashedPass: string,
			joinDate: string,
			FirstName: string,
			LastName: string,
			Birthday: string,
			GymId: number,
		): SQLStatement => SQL`
			INSERT INTO Trainers
			(Email, Password, JoinDate, FirstName,LastName,Birthday,GymId)
			VALUES (${email}, ${hashedPass}, ${joinDate}, ${FirstName},${LastName},${Birthday},${GymId})
		`,
		CreateClient: (
			email: string,
			firstName: string,
			lastName: string,
			birthday: string,
			JoinDate: string,
			mobile: string,
			goal: string,
			trainerId: number,
			GymId: number,
			avatarUrl: string,
		): SQLStatement => SQL`
			INSERT INTO Clients
			(Email, FirstName, LastName, JoinDate, Birthday, Mobile, Goal, GymId, TrainerId, Avatar)
			VALUES (${email}, ${firstName}, ${lastName}, ${birthday}, ${JoinDate}, ${mobile},${goal},${GymId},${trainerId},${avatarUrl})
		`,
		CreateAppointment: (
			title: string,
			startDate: string,
			endDate: string,
			ClientId: number,
			TrainerId: number,
		): SQLStatement => SQL`
			INSERT INTO appointments
			(title, startDate, endDate, ClientId,TrainerId)
			VALUES (${title}, ${startDate}, ${endDate}, ${ClientId},${TrainerId})
		`,
		getClientName: (
			ClientId: number,
		): SQLStatement => SQL`
			SELECT FirstName, LastName, ClientId 
			FROM clients
			WHERE ClientId = ${ClientId}
		`,

	},

	Update: {
		GymLogIn: (
			GymId: number
		): SQLStatement => SQL`
			UPDATE gyms
			SET LoggedIn = 1
			WHERE GymId = ${GymId}
		`,
		GymLogOut: (
			GymId: number
		): SQLStatement => SQL`
			UPDATE gyms
			SET LoggedIn = false
			WHERE Email = ${GymId}
		`,
		TrainerLogIn: (
			TrainerId: number
		): SQLStatement => SQL`
			UPDATE trainers
			SET LoggedIn = 1
			WHERE TrainerId = ${TrainerId}
		`,
		TrainerLogOut: (
			GymId: number
		): SQLStatement => SQL`
			UPDATE gyms
			SET LoggedIn = false
			WHERE Email = ${GymId}
		`,

	},
	Delete: {},
}

export default async function Query(
	statement: SQLStatement
): Promise<any> {
	return new Promise((resolve, reject) => {
		DB.query(statement, (err, results) => {
			if (err) return reject(err)
			resolve(results)
		})
	})
}