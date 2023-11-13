UPDATE `stud_rec`
SET
    `stud_fname` = LTRIM(`stud_fname`),
    `stud_lname` = LTRIM(`stud_lname`),
    `stud_mname` = LTRIM(`stud_mname`);

CREATE TABLE `user_logs` (
    `id` INT(6) PRIMARY KEY AUTO_INCREMENT,
    `created_by` INT(6),
    `created_date` DATETIME,
    `title` VARCHAR(100),
    `details` TEXT,
    FOREIGN KEY (`created_by`) REFERENCES `user`(`id`)
);

ALTER TABLE `x_file` CHANGE `dt` `dt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `x_file` CHANGE `dt` `uploaded_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `x_file` CHANGE `user_id` `uploaded_by` INT(10) NULL DEFAULT NULL;
