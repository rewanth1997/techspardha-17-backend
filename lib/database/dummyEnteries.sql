use techspardha2017;
Insert into Students(Name,Email) values('Shivam','sharmashivam0530@gmail.com');
Insert into Students(Name,Email) values('Rewanth','rewanth@gmail.com');
Insert into Students(Name,Email) values('Anshul','anshul@gmail.com');
Insert into Students(Name,Email) values('Ankit','ankit@gmail.com');
INSERT INTO `StudentDetails` (`RollNo`,`PhoneNumber`,`Branch`,`Year`,`College`,`Gender`,`IsNew`, `Id`) VALUES ('1140549','97456235454','CS','3','NIT','male', 1, '1');
INSERT INTO `StudentDetails` (`RollNo`,`PhoneNumber`,`Branch`,`Year`,`College`,`Gender`,`IsNew`, `Id`) VALUES ('1140560','741256235454','CS','3','NIT','male', 1, '2');
INSERT INTO `StudentDetails` (`RollNo`,`PhoneNumber`,`Branch`,`Year`,`College`,`Gender`,`IsNew`, `Id`) VALUES ('1130541','8747456235454','IT','4','NIT','male', 1, '3');
INSERT INTO `StudentDetails` (`RollNo`,`PhoneNumber`,`Branch`,`Year`,`College`,`Gender`,`IsNew`, `Id`) VALUES ('1140581','8747456235454','CS','4','NIT','male', 1, '4');
INSERT INTO `Categories`(`Name`, `Description`) VALUES('Managerial', '');
INSERT INTO `Categories`(`Name`, `Description`) VALUES('Technical', '');
INSERT INTO `Categories`(`Name`, `Description`) VALUES('Techno Managerial', '');
INSERT INTO `Categories`(`Name`, `Description`) VALUES('Gawds Special', '');
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,1,1);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,2,1);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,3,1);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,2,2);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,3,2);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,3,3);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,4,3);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,1,4);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,2,4);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,3,4);
INSERT INTO `Interests` (`Id`,`CategoryId`,`StudentId`) VALUES (DEFAULT,4,4);

INSERT INTO `Coordinators` (`Id`, `Name`, `Username`, `Email`, `Password`, `PhoneNo`, `createdAt`, `updatedAt`) VALUES (NULL, 'Anshul', 'malikanshul', 'malikanshul29@gmail.com', '123', '4444', '2016-11-30 00:00:00', '2016-11-30 00:00:00');
INSERT INTO `Societies` (`Id`, `Name`, `Description`) VALUES (NULL, 'Technobyte', 'Technical society of NIT Kurukshetra');
Insert into Events(Name,Description,Venue,Start,End,CurrentRound,MaxContestants,Status,Pdf,Rules,CategoryId,SocietyId) Values('Exclibur','This is an event','E101',now(),now(),5,11,"Runnning","rules.pdf","Ther rae no rules for this",1,1);
Insert into Events(Name,Description,Venue,Start,End,CurrentRound,MaxContestants,Status,Pdf,Rules,CategoryId,SocietyId) Values('Exc','This is an event','E101',now(),now(),5,11,"Runnning","rules.pdf","Ther rae no rules for this",1,1); Query OK, 1 row affected (0.11 sec)
Insert into Events(Name,Description,Venue,Start,End,CurrentRound,MaxContestants,Status,Pdf,Rules,CategoryId,SocietyId) Values('Akjfk','This is an event','E101',now(),now(),5,11,"Runnning","rules.pdf","Ther rae no rules for this",1,1); Query OK, 1 row affected (0.11 sec)
Insert Into CoordinatorEvents values(default,1,1);
Insert Into CoordinatorEvents values(default,1,2);
Insert Into CoordinatorEvents values(default,2,2);
Insert Into CoordinatorEvents values(default,3,2);
