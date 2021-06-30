USE fittrainer;
SHOW tables;
DESCRIBE trainers;
DESCRIBE gyms;
DESCRIBE clients;
DESCRIBE appointments;
SELECT * FROM trainers;
SELECT * FROM appointments;
SELECT * FROM exercises;
SELECT * FROM equipment;
SELECT * FROM muscle_groups;
DELETE FROM workouts WHERE WorkoutId > 0;
SELECT * FROM workouts;
SELECT * FROM gyms;
SELECT * FROM clients;
DELETE FROM `fittrainer`.`equipment` WHERE EquipmentId = 15;


UPDATE exercises Set Equipment = 13 WHERE ExerciseId > 159;

INSERT INTO muscle_groups (muscle_group_name) values('Shoulders');

INSERT INTO exercises (Muscle_Group, Equipment, Name) values(21, 26, 'Chin Ups'); 

INSERT INTO trainers (Email, Password, FirstName, LastName, Age, JoinDate, Avatar) values('kyle@gym.com', 'password', 'Kyle', 'Caprio', 27 ,'2021-04-20 17:45:23', null);
INSERT INTO gyms (Email, GymName, Password, JoinDate,Avatar) values('huntsgym@gym.com', 'Hunts Gym', 'password', '2021-04-20 17:45:23', null);
SELECT COALESCE(SUM(appointments.WorkoutId),0)
			FROM appointments
			JOIN workouts ON appointments.WorkoutId = workouts.WorkoutId
            WHERE appointments.TrainerId = 1;
            
DELETE FROM trainers WHERE TrainerId > 0;