drop database if exists notenrechnerdb;
create database notenrechnerdb;
use notenrechnerdb;

create table if not exists Semester (
    SemesterID int primary key not null auto_increment,
    Semester varchar(50) not null,
    currentSemester boolean default false
);

create table if not exists Fach (
    FachID int primary key not null auto_increment,
    SemesterID int not null,
    Fach varchar(50) not null,
    foreign key (SemesterID) references Semester(SemesterID)

);
create table if not exists Note (
    NotenID int primary key not null auto_increment,
    Note int not null
);

insert into Semester (Semester) values ('HS1'),('FS1'),('HS2'),('FS2');
insert into Fach (SemesterID, Fach) values (1,'Mathematik'),(2,'Deutsch'),(3,'Englisch'),(4,'Biologie');

delimiter //
create procedure updateCurrentSemester (Semester_ID int)
    deterministic
    begin
        update Semester set currentSemester = false where Semester.SemesterID <> Semester_ID;
        update Semester set currentSemester = true where Semester.SemesterID = Semester_ID;

    end //
delimiter ;

call updateCurrentSemester(1);
call updateCurrentSemester(2);
select * from Semester;
select * from Fach;