USE fittrainer;
SHOW tables;

DESCRIBE trainers;
DESCRIBE gyms;
DESCRIBE clients;
SELECT * FROM trainers;
SELECT * FROM gyms;
SELECT * FROM clients;
DELETE FROM `fittrainer`.`clients` WHERE ClientId = 2;
UPDATE trainers Set FirstName= 'Hunter', LastName='Foulk' WHERE TrainerId = 1;

INSERT INTO trainers (Email, Password, FirstName, LastName, Age, JoinDate, Avatar) values('kyle@gym.com', 'password', 'Kyle', 'Caprio', 27 ,'2021-04-20 17:45:23', null);
INSERT INTO gyms (Email, GymName, Password, JoinDate,Avatar) values('huntsgym@gym.com', 'Hunts Gym', 'password', '2021-04-20 17:45:23', null);

DELETE FROM trainers WHERE TrainerId > 0;