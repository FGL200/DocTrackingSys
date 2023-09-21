DROP DATABASE `doc_track_sys`;

CREATE DATABASE `doc_track_sys`;

USE `doc_track_sys`;

CREATE TABLE `user` (
	`id` int(10) PRIMARY KEY AUTO_INCREMENT,
    `uname` VARCHAR(20),
    `pword` VARCHAR(255),
    `active` INT(1) DEFAULT 1,
    `role` ENUM('A','E','V') DEFAULT 'V'
);

CREATE TABLE `info` (
    `id` INT(10) PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT(10) UNIQUE NOT NULL,
    `fname` VARCHAR(50),
    `mname` VARCHAR(50),
    `lname` VARCHAR(50),
    `bday` DATE,
    `gender` ENUM('M','F','N') DEFAULT 'N',
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `x_file`(
	`id` INT(10) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50),
    `dt` DATE,
    `user_id` INT(10),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `stud_rec` (
	`id` INT(10) PRIMARY KEY AUTO_INCREMENT,
    `user_id` int(10) NOT NULL,
    `x_file_id` int(10) DEFAULT NULL,
    `stud_fname` varchar(50) NOT NULL,
    `stud_mname` varchar(50) DEFAULT NULL,
    `stud_lname` varchar(50) DEFAULT NULL,
    `stud_sfx` varchar(20) DEFAULT NULL,
    `stud_id` varchar(20) DEFAULT NULL,
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `created_by_uid` INT(10) DEFAULT NULL,
    `updated_by_uid` INT(10) DEFAULT NULL,
    FOREIGN KEY (`created_by_uid`) REFERENCES `user`(`id`),
    FOREIGN KEY (`updated_by_uid`) REFERENCES `user`(`id`),
    FOREIGN KEY (`x_file_id`) REFERENCES `x_file`(`id`)
);

CREATE TABLE `remarks` (
    `id` INT(10) PRIMARY KEY AUTO_INCREMENT,
    `stud_rec_id` INT(10) UNIQUE NOT NULL,
    `value` VARCHAR(255),
    `category`  VARCHAR(100),
    FOREIGN KEY (`stud_rec_id`) REFERENCES `stud_rec`(`id`)
);

CREATE TABLE `doc` (
	`id` INT(10) PRIMARY KEY AUTO_INCREMENT,
    `stud_rec_id` INT(10) UNIQUE NOT NULL,
    `regi_form` INT(1) DEFAULT 0,
    `good_moral` INT(1) DEFAULT 0,
    `f137` INT(1) DEFAULT 0,
    `f138` INT(1) DEFAULT 0,
    `birth_cert` INT(1) DEFAULT 0,
    `tor` INT(1) DEFAULT 0,
    `app_grad` INT(1) DEFAULT 0,
    `cert_of_complete` INT(1) DEFAULT 0,
    `req_clearance_form` INT(1) DEFAULT 0,
    `req_credentials` INT(1) DEFAULT 0,
    `hd_or_cert_of_trans` INT(1) DEFAULT 0,
    `shelf` VARCHAR(50),
    FOREIGN KEY (`stud_rec_id`) REFERENCES `stud_rec`(`id`)
);

CREATE TABLE `scan` (
	`id` INT(10) PRIMARY KEY AUTO_INCREMENT,
    `stud_rec_id` INT(10) UNIQUE NOT NULL,
    `regi_form` VARCHAR(255),
    `good_moral` VARCHAR(255),
    `f137` VARCHAR(255),
    `f138` VARCHAR(255),
    `birth_cert` VARCHAR(255),
    `tor` VARCHAR(255),
    `app_grad` VARCHAR(255),
    `cert_of_complete` VARCHAR(255),
    `req_clearance_form` VARCHAR(255),
    `req_credentials` VARCHAR(255),
    `hd_or_cert_of_trans` VARCHAR(255),
    FOREIGN KEY (`stud_rec_id`) REFERENCES `stud_rec`(`id`)
);

INSERT INTO `user` 
(`uname`,`pword`,`active`,`role`)
VALUES
('admin', PASSWORD('123'), '1', 'A'),
('encoder', PASSWORD('123'), '1', 'E'),
('viewer1', PASSWORD('123'), '1', 'V'),
('viewer2', PASSWORD('123'), '0', 'V');