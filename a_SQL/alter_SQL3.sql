INSERT INTO `remark_categories`(`category`) VALUES ('NOT ORIG. TOR')

INSERT INTO `remark_categories`(`category`) VALUES ('TRANSFEREE')

SELECT 
	sr.updated_by_uid,
	`doc`.* 
FROM stud_rec as sr
INNER JOIN `doc` 
	ON sr.id = `doc`.`stud_rec_id`
WHERE 
	(regi_form NOT LIKE '%"dir"%:%""%' 
    OR 
    good_moral NOT LIKE '%"dir"%:%""%' 
    OR 
    `j_f137` NOT LIKE '%"dir"%:%""%' 
    OR 
    `s_f137` NOT LIKE '%"dir"%:%""%' 
    OR 
    `f138` NOT LIKE '%"dir"%:%""%' 
    OR 
    `birth_cert` NOT LIKE '%"dir"%:%""%' 
    OR 
    `tor` NOT LIKE '%"dir"%:%""%' 
    OR 
    `app_grad` NOT LIKE '%"dir"%:%""%' 
    OR 
    `cert_of_complete` NOT LIKE '%"dir"%:%""%' 
    OR 
   `req_clearance_form` NOT LIKE '%"dir"%:%""%' 
    OR 
    `req_credentials` NOT LIKE '%"dir"%:%""%' 
    OR 
   `hd_or_cert_of_trans` NOT LIKE '%"dir"%:%""%' )
   	AND sr.updated_by_uid = '5'

ALTER TABLE `stud_rec` CHANGE `updated_date` `updated_date` DATETIME NULL DEFAULT NULL;

UPDATE `stud_rec` SET `updated_date` = NULL WHERE `updated_by_uid` is NULL