-- STRUCTURE OF `user` TABLE
ALTER TABLE `user` 
    ADD `created_by` INT(10) NOT NULL,
    ADD FOREIGN KEY (`created_by`) REFERENCES `user`(`id`),
    ADD `updated_by` INT(10) NULL,
    ADD FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`), 
    ADD `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    ADD `updated_date` DATETIME NULL,
    ADD `deleted_flag` INT(1) DEFAULT 0;

UPDATE `user`
    SET `created_by` = '1'

-- `user_info`
ALTER TABLE `user_info` 
    ADD `updated_by` INT(10) NULL AFTER `gender`, 
    ADD `updated_date` DATETIME NULL DEFAULT NULL AFTER `updated_by`;


SELECT 
(SELECT
	COUNT(*)
FROM `stud_rec` r
INNER JOIN `doc` d
	ON `d`.`stud_rec_id` = r.id
WHERE 
	r.deleted_flag = 0 AND 
    d.shelf = '1') 'users',
(
    SELECT 
        COUNT(*)
    FROM (
        SELECT 
            *
        FROM (
            SELECT 
                `created_by_uid` `enc`
            FROM `stud_rec`
            INNER JOIN `doc`
                on doc.stud_rec_id = stud_rec.id
            WHERE stud_rec.deleted_flag = 0
            UNION
            SELECT 
                `updated_by_uid` `enc`
            FROM `stud_rec`
            INNER JOIN `doc`
                on doc.stud_rec_id = stud_rec.id
            WHERE stud_rec.deleted_flag = 0
        ) 
        GROUP BY `enc`
    )
) 'encoders'