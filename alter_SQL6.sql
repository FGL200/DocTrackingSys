
CREATE TABLE `shelves` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_flag` enum('0','1') NOT NULL DEFAULT '0'
);

-- ALTER TABLE `shelves` ADD `updated_by` INT AFTER `created_date`;
-- ALTER TABLE `shelves` ADD `updated_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `updated_by`;

ALTER TABLE shelves
ADD FOREIGN KEY(updated_by) REFERENCES user(id);

UPDATE `doc` SET shelf = "1"; -- ID NG 2020-2021 na Shelf

-- ALTER TABLE `doc` CHANGE `shelf` `shelf` INT(10) NULL DEFAULT NULL;