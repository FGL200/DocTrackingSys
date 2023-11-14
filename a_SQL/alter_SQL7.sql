SET GLOBAL FOREIGN_KEY_CHECKS=0;

-- STRUCTURE OF `user` TABLE
ALTER TABLE `user` 
    ADD `created_by` INT(10) NOT NULL,
    ADD FOREIGN KEY (`created_by`) REFERENCES `user`(`id`),
    ADD `updated_by` INT(10) NULL,
    ADD FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`), 
    ADD `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    ADD `updated_date` DATETIME NULL,
    ADD `deleted_flag` INT(1) DEFAULT 0;

-- `user_info`
ALTER TABLE `user_info` 
    ADD `updated_by` INT(10) NULL AFTER `gender`, 
    ADD `updated_date` DATETIME NULL DEFAULT NULL AFTER `updated_by`;

SET GLOBAL FOREIGN_KEY_CHECKS=1;