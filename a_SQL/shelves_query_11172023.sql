-- This query is for the informations of the shelf
SELECT 
(
    SELECT
	    COUNT(*)
    FROM `stud_rec` r
    INNER JOIN `doc` d
        ON `d`.`stud_rec_id` = r.id
    WHERE 
        r.deleted_flag = 0 AND 
        d.shelf = '1'
) 'users',
(
    SELECT 
        COUNT(*)
    FROM 
    (
        SELECT 
            `tbl1`.`enc`
        FROM 
        (
            SELECT 
                `created_by_uid` `enc`
            FROM `stud_rec`
            INNER JOIN `doc`
                on doc.stud_rec_id = stud_rec.id
            WHERE stud_rec.deleted_flag = 0 AND doc.shelf = '1'
            UNION
            SELECT 
                `updated_by_uid` `enc`
            FROM `stud_rec`
            INNER JOIN `doc`
                on doc.stud_rec_id = stud_rec.id
            WHERE stud_rec.deleted_flag = 0 AND doc.shelf = '1'
        ) `tbl1`
        GROUP BY `tbl1`.`enc`
    ) `tbl2`
) `encoders`,
(
    SELECT 
        `updated_date`
    FROM `stud_rec`
    ORDER BY `updated_date` DESC LIMIT 1
) `latest`

FROM `shelves`