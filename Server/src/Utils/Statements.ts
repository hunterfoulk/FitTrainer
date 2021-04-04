import DB from '../Database/MySQL'
import SQL, { SQLStatement } from 'sql-template-strings'

export const statements = {
	Get: {

		AllTrainers: (TrainerId
		): SQLStatement => SQL`
			SELECT Email 
			FROM Trainers WHERE TrainerId = ${TrainerId}
		`,

		AllGyms: (GymId
		): SQLStatement => SQL`
			SELECT Email 
			FROM Gyms WHERE GymId = ${GymId}
		`,
		gymLogin: (
			email: string
		): SQLStatement => SQL`
			SELECT GymId, Email, Password
			FROM gyms
			WHERE email LIKE BINARY ${email}
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

		RefreshValidation: (
		): SQLStatement => SQL`
		
		`
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
	},
	Update: {},
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