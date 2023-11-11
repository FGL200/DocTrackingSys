UPDATE `stud_rec`
SET
    `stud_fname` = LTRIM(`stud_fname`),
    `stud_lname` = LTRIM(`stud_lname`),
    `stud_mname` = LTRIM(`stud_mname`);

CREATE TABLE `user_logs` (
    `created_by` INT(6),
    `created_date` DATETIME,
    `title` VARCHAR(100),
    `details` TEXT,
    FOREIGN KEY (`created_by`) REFERENCES `user`(`id`)
)