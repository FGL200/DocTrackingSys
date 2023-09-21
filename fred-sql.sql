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
    `stud_fname` varchar(50) NOT NULL,
    `stud_mname` varchar(50) DEFAULT NULL,
    `stud_lname` varchar(50) DEFAULT NULL,
    `stud_sfx` varchar(20) DEFAULT NULL,
    `stud_id` varchar(20) DEFAULT NULL,
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `created_by_uid` INT(10) DEFAULT NULL,
    `updated_by_uid` INT(10) DEFAULT NULL,
    `x_file_id` int(10) DEFAULT NULL,
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
    `regi_form` JSON DEFAULT '{val: 0, dir:""}',
    `good_moral` JSON DEFAULT '{val: 0, dir:""}',
    `f137` JSON DEFAULT '{val: 0, dir:""}',
    `f138` JSON DEFAULT '{val: 0, dir:""}',
    `birth_cert` JSON DEFAULT '{val: 0, dir:""}',
    `tor` JSON DEFAULT '{val: 0, dir:""}',
    `app_grad` JSON DEFAULT '{val: 0, dir:""}',
    `cert_of_complete` JSON DEFAULT '{val: 0, dir:""}',
    `req_clearance_form` JSON DEFAULT '{val: 0, dir:""}',
    `req_credentials` JSON DEFAULT '{val: 0, dir:""}',
    `hd_or_cert_of_trans` JSON DEFAULT '{val: 0, dir:""}',
    `shelf` VARCHAR(50),
    FOREIGN KEY (`stud_rec_id`) REFERENCES `stud_rec`(`id`)
);

INSERT INTO `user` 
(`uname`,`pword`,`active`,`role`)
VALUES
('admin', PASSWORD('123'), '1', 'A'),
('encoder', PASSWORD('123'), '1', 'E'),
('viewer1', PASSWORD('123'), '1', 'V'),
('viewer2', PASSWORD('123'), '0', 'V');