-- ADD JUNIOR AND SENIOR F137
ALTER TABLE `doc` CHANGE `f137` `s_f137` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` ADD `j_f137` JSON NULL DEFAULT '{"val": 0, "dir":""}' AFTER `good_moral`;

-- FIX POSSIBLE BUGS
ALTER TABLE `doc` CHANGE `regi_form` `regi_form` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `good_moral` `good_moral` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `f138` `f138` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `birth_cert` `birth_cert` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `tor` `tor` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `app_grad` `app_grad` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `cert_of_complete` `cert_of_complete` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `req_clearance_form` `req_clearance_form` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `req_credentials` `req_credentials` JSON NULL DEFAULT '{"val": 0, "dir":""}';
ALTER TABLE `doc` CHANGE `hd_or_cert_of_trans` `hd_or_cert_of_trans` JSON NULL DEFAULT '{"val": 0, "dir":""}';

-- ADDED DELETED FLAG IN `stud_rec` TABLE
ALTER TABLE `stud_rec` ADD `deleted_flag` INT(1) NULL DEFAULT '0' AFTER `updated_by_uid`;

-- CHANGED THE DEFAULT VALUE OF `remarks`.value to JSON (EMPTY ARRAY)
ALTER TABLE `remarks` CHANGE `value` `value` LONGTEXT NULL DEFAULT '[]';

-- CHANGE MAX LENGTH OF REMARKS TO 100
ALTER TABLE `remark_categories` CHANGE `category` `category` VARCHAR(100) DEFAULT NULL;

-- INSERT OTHER REMARKS (REQUIRED)
INSERT INTO `remark_categories` (`category`)
VALUES
('NOT ORIG. - REGISTRATION FORM'),
('NOT ORIG. - GOOD MORAL'),
('NOT ORIG. - JUNIOR F137'),
('NOT ORIG. - SENIOIR F137'),
('NOT ORIG. - F138'),
('NOT ORIG. - BIRTH CERTIFICATE'),
('INV. REMARKS - SENIOIR F137');







