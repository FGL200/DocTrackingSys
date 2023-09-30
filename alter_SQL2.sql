UPDATE `remark_categories` SET `category` = 'MISPLACED DOCUMENTS' WHERE `remark_categories`.`id` = 3;



SELECT 
	`id`, 
    `category`, 
    `value`,
    CASE 
        WHEN `value` LIKE '%["%'
        THEN `value`
    ELSE CASE 
        WHEN `value` = ''
        THEN '[]'
    ELSE CASE 
        WHEN `value` = '[]'
        THEN '[]'
    ELSE CASE 
        WHEN `value` IS NOT NULL
        THEN CONCAT('["', `value`, '"]')
    END
    END
    END 
    END
    AS `NEW VALUE` 
FROM `remarks`


SELECT `id`, `category`, `value`, CASE WHEN `value` LIKE '%["%' THEN `value` ELSE CASE WHEN `value` = '' THEN '[]' ELSE CASE WHEN `value` = '[]' THEN '[]' ELSE CASE WHEN `value` IS NOT NULL THEN CONCAT('["', `value`, '"]') END END END END AS `NEW VALUE` FROM `remarks`