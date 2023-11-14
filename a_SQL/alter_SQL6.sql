CREATE TABLE `shelves` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(25) NOT NULL UNIQUE,
  `created_by` int(10) NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(10) NULL,
  `updated_date` datetime NULL,
  `deleted_flag` INT(1) NOT NULL DEFAULT '0',
  FOREIGN KEY(`updated_by`) REFERENCES `user`(`id`),
  FOREIGN KEY(`created_by`) REFERENCES `user`(`id`)
);

INSERT INTO `shelves` SET `name` = "2020-2021", `created_by` = '1', `created_date` = CURRENT_TIMESTAMP;

UPDATE `doc` SET `shelf` = "1";

ALTER TABLE `doc` CHANGE `shelf` `shelf` INT(10) NULL;
ALTER TABLE `doc` ADD FOREIGN KEY (`shelf`) REFERENCES `shelves`(`id`);