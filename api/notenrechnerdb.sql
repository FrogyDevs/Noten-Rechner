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
    currentFach boolean default false,
    foreign key (SemesterID) references Semester(SemesterID) on delete cascade

);
create table if not exists Note (
    NotenID int primary key not null auto_increment,
    FachID int not null,
    exam varchar(50) not null,
    Note float not null,
    foreign key (FachID) references Fach(FachID) on delete cascade
);

insert into Semester (Semester) values ('HS1'),('FS1'),('HS2'),('FS2');
insert into Fach (SemesterID, Fach) values (1,'Mathematik'),(2,'Deutsch'),(3,'Englisch'),(4,'Biologie');
insert into Note (exam, Note, FachID) values ('Prüfung 1',5.1,1), ('Prüfung 1',5.2,2), ('Prüfung 1',5.3,3), ('Prüfung 1',5.4,4);

delimiter //
create procedure updateCurrentSemester (Semester_ID int)
    deterministic
    begin
        update Semester set currentSemester = false where Semester.SemesterID <> Semester_ID;
        update Semester set currentSemester = true where Semester.SemesterID = Semester_ID;

    end //

create procedure updateCurrentFach (Fach_ID int)
    deterministic
    begin
        update Fach set currentFach = false where Fach.FachID <> Fach_ID;
        update Fach set currentFach = true where Fach.FachID = Fach_ID;
    end //
delimiter ;

call updateCurrentFach(1);
select * from Semester;
select * from Fach;
