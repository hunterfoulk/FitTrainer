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
			SELECT GymId, Email, FirstName, LastName, Avatar, JoinDate, TrainerId, Mobile
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
		SELECT a.*, (SELECT IFNULL(JSON_OBJECT(
            'WorkoutId', w.WorkoutId,
            'workout_name', w.workout_name,
            'exercises', (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'ExecerciseId', e.ExerciseId,
                     'WorkoutId', b.w_Id,
                     'muscle_group_name', mg.muscle_group_name,
                    'Name', e.Name,
                    'sets', b.sets,
					'reps', b.reps
                    )
                )
                FROM workout_exercises b
				INNER JOIN muscle_groups mg
                ON mg.MuscleGroupId = b.ex_Id
                INNER JOIN exercises e
                WHERE b.ex_Id = e.ExerciseId
                AND b.w_Id = w.WorkoutId

                )

        ), '{}')
        FROM workouts w
        WHERE w.workoutId = a.WorkoutId
    ) as workout FROM appointments a WHERE a.TrainerId = ${TrainerId}
		`,
		GetNewAppointment: (
			id: number,
		): SQLStatement => SQL`
			SELECT *
			FROM appointments
			WHERE id = ${id}
		`,
		GetTrainersPrograms: (
			TrainerId: number,
		): SQLStatement => SQL`
			SELECT * FROM workouts
			WHERE TrainerId = ${TrainerId}
		`,
		GetExercises: (
		): SQLStatement => SQL`
			SELECT * FROM exercises a INNER JOIN muscle_groups b ON a.Muscle_Group = b.MuscleGroupId INNER JOIN equipment c ON a.Equipment = c.EquipmentId
		`,
		GetTrainersWorkouts: (
			TrainerId: string
		): SQLStatement => SQL`
			SELECT * FROM workouts WHERE TrainerId = ${TrainerId}
		`,
		GetCreatedWorkout: (
			WorkoutId: string
		): SQLStatement => SQL`
			SELECT * FROM workouts WHERE WorkoutId = ${WorkoutId}
		`,
		GetMostRecentWorkoutId: (
			TrainerId: string
		): SQLStatement => SQL`
		SELECT MAX(WorkoutId) from workouts WHERE TrainerId = ${TrainerId}
		`,

		GetTrainersClients: (
			TrainerId: number,

		): SQLStatement => SQL`
			SELECT *
			FROM clients
			WHERE ${TrainerId}
		`,
		NewClient: (
			ClientId: string
		): SQLStatement => SQL`
			SELECT * FROM clients WHERE ClientId = ${ClientId}
		`,
		TrainersWorkouts: (
			ClientId: string
		): SQLStatement => SQL`
			SELECT * FROM workouts WHERE TrainerId = ${ClientId}
		`,
		GetAppointmentWorkout: (
			WorkoutId: string
		): SQLStatement => SQL`
			SELECT * FROM workouts WHERE WorkoutId = ${WorkoutId}
		`,

		GetMuscleGroups: (
		): SQLStatement => SQL`
			SELECT * FROM muscle_groups
		`,
		GetEquipment: (
		): SQLStatement => SQL`
			SELECT * FROM equipment
		`,
		GetNewExercise: (
			ExerciseId: string
		): SQLStatement => SQL`
			SELECT * FROM exercises a INNER JOIN muscle_groups b ON a.Muscle_Group = b.MuscleGroupId INNER JOIN equipment c ON a.Equipment = c.EquipmentId WHERE ExerciseId = ${ExerciseId}
		`,
		GetRecentAppointments: (
			TrainerId: number,

		): SQLStatement => SQL`
		select * from appointments
		where startDate between date_sub(now(),INTERVAL 1 WEEK) and now() AND TrainerId = ${TrainerId} AND completed = 1
		`,
		GetMostRecentWorkoutWithExercises: (
			TrainerId: number,
			WorkoutId: number,

		): SQLStatement => SQL`
		select * from workouts WHERE TrainerId = ${TrainerId} AND WorkoutId = ${WorkoutId}

		`,
		GetWorkoutsForAppointmentsJoin: (
			TrainerId: number

		): SQLStatement => SQL`
		SELECT w.*, (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'ExecerciseId', e.ExerciseId,
                     'WorkoutId', b.w_Id,
                     'muscle_group_name',mg.muscle_group_name,
                    'Name', e.Name,
                    'sets', b.sets,
					'reps', b.reps
                    )
                )
                FROM workout_exercises b
				INNER JOIN muscle_groups mg
                ON mg.MuscleGroupId = b.ex_Id
                INNER JOIN exercises e
                WHERE b.ex_Id = e.ExerciseId
                AND b.w_Id = w.WorkoutId

                ) as exercises FROM workouts w WHERE w.TrainerId = ${TrainerId}

		`,

		SelectWorkoutExercises: (
			WorkoutId: number,
		): SQLStatement => SQL`
		select * from workout_exercises a INNER JOIN exercises b ON a.ex_Id = b.ExerciseId INNER JOIN muscle_groups c ON b.Muscle_Group = c.MuscleGroupId WHERE w_Id = ${WorkoutId}

		`,
	},
	Post: {
		Register: (
			email: string,
			hashedPass: string,
			joinDate: string,
			phone: string,
			lastName: string,
			firstName: string
		): SQLStatement => SQL`
			INSERT INTO trainers
			(Email, Password, JoinDate, Mobile, LastName, FirstName)
			VALUES (${email}, ${hashedPass}, ${joinDate}, ${phone}, ${lastName}, ${firstName})
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
			JoinDate: string,
			mobile: string,
			goal: string,
			trainerId: number,
			avatarUrl: string,
		): SQLStatement => SQL`
			INSERT INTO Clients
			(Email, FirstName, LastName, JoinDate, Mobile, Goal, TrainerId, Avatar)
			VALUES (${email}, ${firstName}, ${lastName}, ${JoinDate}, ${mobile},${goal},${trainerId},${avatarUrl})
		`,
		CreateClientDefault: (
			email: string,
			firstName: string,
			lastName: string,
			JoinDate: string,
			mobile: string,
			goal: string,
			trainerId: number,
			defaultAvatar: string
		): SQLStatement => SQL`
			INSERT INTO Clients
			(Email, FirstName, LastName, JoinDate, Mobile, Goal, TrainerId, Avatar)
			VALUES (${email}, ${firstName}, ${lastName}, ${JoinDate}, ${mobile},${goal},${trainerId},${defaultAvatar})
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
		CreateNewWorkout: (
			TrainerId: number,
			workout_name: string,
			JoinDate: string,

		): SQLStatement => SQL`
			INSERT INTO workouts
			(workout_name,JoinDate,TrainerId)
			VALUES (${workout_name},${JoinDate},${TrainerId})
		`,

		CreateNewExercise: (
			MuscleGroupId: number,
			EquipmentId: number,
			Name: string,
		): SQLStatement => SQL`
			INSERT INTO exercises
			(Muscle_Group,Equipment,Name)
			VALUES (${MuscleGroupId}, ${EquipmentId}, ${Name})
		`,
		InsertIntoWorkoutExercises: (
			WorkoutId: number,
			ExerciseId: number,
			reps: number,
			sets: number,
		): SQLStatement => SQL`
			INSERT INTO workout_exercises
			(w_Id,ex_Id,reps,sets)
			VALUES (${WorkoutId}, ${ExerciseId}, ${reps}, ${sets})
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
		UpdateWorkout: (
			WorkoutId: number,
			arr: any,
			workout_name: string
		): SQLStatement => SQL`
			UPDATE workouts
			SET exercises = ${arr}, workout_name = ${workout_name}
			WHERE WorkoutId = ${WorkoutId}
		`,
		UpdateAppointment: (
			WorkoutId: number,
			id: number,
			startDate: any,
			endDate: any
		): SQLStatement => SQL`
			UPDATE appointments
			SET WorkoutId = ${WorkoutId}, startDate = ${startDate}, endDate = ${endDate}
			WHERE id = ${id}
		`,
		UpdateAppointmentDateTime: (
			id: number,
			startDate: any,
			endDate: any
		): SQLStatement => SQL`
			UPDATE appointments
			SET startDate = ${startDate}, endDate = ${endDate}
			WHERE id = ${id}
		`,
		UpdateProfileWithoutAvatar: (
			email: string,
			firstname: string,
			lastname: string,
			mobile: string | null,
			id: any,
		): SQLStatement => SQL`
			UPDATE trainers
			SET Email = ${email}, FirstName = ${firstname}, LastName = ${lastname}, Mobile = ${mobile}
			WHERE TrainerId = ${id}
		`,
		UpdateProfileWithAvatar: (
			email: string,
			firstname: string,
			lastname: string,
			mobile: string | null,
			id: any,
			avatarUrl: string,
		): SQLStatement => SQL`
			UPDATE trainers
			SET Email = ${email}, FirstName = ${firstname}, LastName = ${lastname}, Mobile = ${mobile}, Avatar = ${avatarUrl}
			WHERE TrainerId = ${id}
		`,
		UpdateAppointmentWorkout: (
			WorkoutId: number,
			id: number
		): SQLStatement => SQL`
			UPDATE appointments
			SET WorkoutId = ${WorkoutId}
			WHERE id = ${id}
		`,
		deleteWorkoutFromAppointment: (
			id: number
		): SQLStatement => SQL`
			UPDATE appointments
			SET WorkoutId = NULL
			WHERE id = ${id}
		`,
		UpdateAppointmentCompletedStatusTrue: (
			id: number
		): SQLStatement => SQL`
			UPDATE appointments
			SET completed = 1
			WHERE id = ${id}
		`,
		UpdateAppointmentCompletedStatusFalse: (
			id: number
		): SQLStatement => SQL`
			UPDATE appointments
			SET completed = 0
			WHERE id = ${id}
		`,

	},
	Delete: {
		DeleteAppointment: (
			id: number
		): SQLStatement => SQL`
			DELETE FROM
			appointments WHERE id = ${id}
		`,
		DeleteClient: (
			ClientId: number
		): SQLStatement => SQL`
			DELETE FROM
			clients WHERE ClientId = ${ClientId}
		`,
		DeleteWorkout: (
			WorkoutId: number
		): SQLStatement => SQL`
			DELETE FROM
			workouts WHERE WorkoutId = ${WorkoutId}
		`,
		DeleteWorkoutFromWorkoutExerciseTable: (
			WorkoutId: number
		): SQLStatement => SQL`
			DELETE FROM
			workout_exercises WHERE w_Id = ${WorkoutId}
		`,
		DeleteAppointmentsAfterClientDeleted: (
			ClientId: number
		): SQLStatement => SQL`
			DELETE FROM
			appointments WHERE ClientId = ${ClientId}
		`,


	},
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