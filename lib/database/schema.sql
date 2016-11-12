drop database if exists techspardha2017;
create database if not exists techspardha2017;
use techspardha2017;

create table categories (
  id integer PRIMARY KEY auto_increment,
  name varchar(100) NOT NULL
);

create table societies (
  id integer PRIMARY KEY auto_increment,
  name varchar(100) NOT NULL
) engine = innodb;

create table student(
  id integer PRIMARY KEY auto_increment,
  name varchar(100),
  email varchar(255) unique NOT NULL
) engine = innodb;

create table studentDetails(
  id integer REFERENCES student.id,
  rollNo integer(10) NOT NULL,
  phoneNo varchar(15) NOT NULL,
  branch varchar(30) NOT NULL,
  year varchar(20) NOT NULL,
  college varchar(50) NOT NULL,
  gender varchar(10) NOT NULL,
  token varchar(255) NOT NULL
) engine = innodb;

create table interests (
  id integer PRIMARY KEY auto_increment,
  studentId integer REFERENCES student.id,
  categoryId integer REFERENCES category.id
) engine = innodb;

create table teams (
  id integer PRIMARY KEY auto_increment,
  name varchar(30) NOT NULL,
  eventId integer REFERENCES events.id,
  curLevel integer NOT NULL
) engine = innodb;

# Only pending invites are stored here
# If user accepts the request it will be added
# to the teamUsers table
create table teamInvites (
  teamId integer REFERENCES teams.id,
  studentId integer REFERENCES student.id
) engine = innodb;

create table events (
  id integer PRIMARY KEY auto_increment,
  name varchar(100),
  description text NOT NULL,
  venue varchar(100) NOT NULL,
  startTime varchar(100), /*To be changed to time later on*/
  endTime varchar(100),
  startDate varchar(100),
  endDate varchar(100),
  currentRound integer default 0,
  society varchar(100),
  category varchar(100),
  maxContestants integer,
  status varchar(100) NOT NULL,
  pdf varchar(100)
) engine=innodb;

create table teamUsers (
  teamId integer REFERENCES teams.id,
  studentId integer REFERENCES student.id,
  eventId integer REFERENCES events.id,
  isAdmin boolean
) engine=innodb;

create table guestLec (
  id integer PRIMARY KEY auto_increment,
  startDate DATETIME,
  photo varchar(255),
  description text,
  guestName varchar(100),
  venue varchar(100)
) engine = innodb;

create table wishList(
  lecId integer REFERENCES guestLec.id,
  studentId integer REFERENCES student.id
) engine = innodb;

create table coordinatorUsers (
  id integer PRIMARY KEY auto_increment,
  name varchar(100) NOT NULL,
  username varchar(100) unique NOT NULL,
  password varchar(100) NOT NULL,
  phoneNo varchar(15) NOT NULL
) engine = innodb;

create table coordinatorPanel (
  coordinatorId integer REFERENCES coordinatorUsers (id),
  eventId varchar(100) REFERENCES events (name)
) engine = innodb;
