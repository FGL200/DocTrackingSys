UPDATE `stud_rec`
SET
    `stud_fname` = LTRIM(`stud_fname`)
    `stud_lname` = LTRIM(`stud_lname`)
    `stud_mname` = LTRIM(`stud_mname`)
WHERE 1