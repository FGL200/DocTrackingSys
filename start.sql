CREATE DATABASE `doc_track_sys`;

USE `doc_track_sys`;

CREATE TABLE `user` (
	`id` int(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `uname` VARCHAR(20) NOT NULL,
    `pword` VARCHAR(255) NOT NULL,
    `active` INT(1) NOT NULL DEFAULT 1,
    `role` ENUM('admin','viewer','encoder') NOT NULL DEFAULT 'viewer'
);

CREATE TABLE `info` (
    `id` INT(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `user_id` INT(10) NOT NULL UNIQUE,
    `fname` VARCHAR(50) NOT NULL,
    `mname` VARCHAR(50),
    `lname` VARCHAR(50),
    `bday` DATE,
    `gender` ENUM('M','F','N') DEFAULT 'N',
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `x_file`(
	`id` INT(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `dt` DATE,
    `user_id` INT(10) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `stud_rec` (
	`id` INT(10)PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `user_id` INT(10) NOT NULL UNIQUE,
    `x_file_id` INT(10),
    `fname` VARCHAR(50) NOT NULL,
    `mname` VARCHAR(50),
    `lname` VARCHAR(50),
	`sfx` VARCHAR(20),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`x_file_id`) REFERENCES `x_file`(`id`)
);

CREATE TABLE `doc` (
	`id` INT(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `stud_rec_id` INT(10) NOT NULL UNIQUE,
    `f137` INT(1) NOT NULL DEFAULT 0,
    `f138` INT(1) NOT NULL DEFAULT 0,
    `bcert` INT(1) NOT NULL DEFAULT 0,
    `tor_hd` INT(1) NOT NULL DEFAULT 0,
    `clearance_f` INT(1) NOT NULL DEFAULT 0,
    `app_grad` INT(1) NOT NULL DEFAULT 0,
    `cred` INT(1) NOT NULL DEFAULT 0,
    `regi` INT(1) NOT NULL DEFAULT 0,
    `c_honorable` INT(1) NOT NULL DEFAULT 0,
    `c_trans` INT(1) NOT NULL DEFAULT 0,
    `complete` INT(1) NOT NULL DEFAULT 0,
    `good_m` INT(1) NOT NULL DEFAULT 0,
    `shelf` VARCHAR(50),
    FOREIGN KEY (`stud_rec_id`) REFERENCES `stud_rec`(`id`)
);

INSERT INTO `user` 
(`uname`,`pword`,`active`,`role`)
VALUES
('admin', PASSWORD('123'), '1', 'admin'),
('encoder', PASSWORD('123'), '1', 'encoder'),
('viewer1', PASSWORD('123'), '1', 'viewer'),
('viewer2', PASSWORD('123'), '0', 'viewer');