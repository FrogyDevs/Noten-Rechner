drop database if exists notenrechnerdb;
create database notenrechnerdb;
use notenrechnerdb;

create table if not exists Fach (
                                    FachID int primary key not null auto_increment,
                                    Fach varchar(50) not null
);
create table if not exists Note (
                                    NotenID int primary key not null auto_increment,
                                    Note int not null
);
create table if not exists Semester (
                                        FachID int not null,
                                        NoteID int not null,
                                        Semester varchar(50) not null,
                                        primary key (FachID, NoteID),
                                        foreign key (FachID) references Fach(FachID),
                                        foreign key (NoteID) references Note(NotenID)
);
select * from Fach;