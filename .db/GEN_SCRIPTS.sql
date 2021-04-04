USE fittrainer;
SHOW tables;

DESCRIBE trainers;

SELECT * FROM trainers;

INSERT INTO trainers (Email, Password, JoinDate, FirstName, LastName, Age, Avatar) values('trainer1@gym.com', 'password', '2021-04-20 17:45:23', 'trainer', 'one', 25, null);

DELETE FROM trainers WHERE TrainerId > 0;