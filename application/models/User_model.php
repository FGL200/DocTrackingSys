<?php
defined('BASEPATH') or exit('No direct script access allowed');

class User_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function insert_user($data)
    {
        $query = "INSERT INTO `user` SET {$data}";
        $result = $this->db->query($query);
        return $result ? $this->db->insert_id() : false;
    }

    public function insert_user_info($data)
    {
        $query = "INSERT INTO `user_info` SET {$data}";
        $result = $this->db->query($query);
        return $result ? $this->db->insert_id() : false;
    }

    public function update_user_info($data)
    {
        //update info

    }

    public function login_user($username, $password)
    {
        $query = "SELECT 
                        `i`.fname `fname`,
                        `i`.lname `lname`,
                        `i`.mname `mname`,
                        `i`.bday `bday`,
                        `i`.gender `g`,
                        `u`.id `uid`,
                        `u`.role  `role`,
                        `u`.uname  `uname`
                FROM `user_info` as `i` 
                JOIN `user` as `u` 
                    ON `u`.id = `i`.user_id
                WHERE `u`.uname = '{$username}' AND `u`.pword = PASSWORD('{$password}') AND `u`.active = '1'
                LIMIT 1
                ";
        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result_array()[0]  : null;
    }

    /**
     * All the records of the student created by specific user
     * @param Integer $user_id
     */
    public function get_Student_Records_By_User($user_id)
    {
        $sql = "SELECT
            LPAD(`sr`.`id`, 6, '0') as `ID`,
            `sr`.`stud_mname` `Last Name`,
            `sr`.`stud_mname` `Middle Name`,
            `sr`.`stud_lname` `First Name`,
            `sr`.`stud_sfx` `Suffix`,
            `d`.regi_form `Regiform`,
            `d`.good_moral `Good Moral`,
            `d`.f137 `F137`,
            `d`.f138 `F138`,
            `d`.birth_cert `Birth Cert`,
            `d`.tor `TOR`,
            `d`.app_grad `App Grad`,
            `d`.cert_of_complete `Certificate of Completion`,
            `d`.req_clearance_form `Clearance Form`,
            `d`.req_credentials `Request Credential`,
            `d`.hd_or_cert_of_trans `HD or Cert of Trans`,
            `rm`.value `Remarks`,
            `rm`.category `Category` ,
            `u`.`uname` `Created By`,
            `sr`.`created_date` `Created Date`,
            `sr`.`updated_date` `Updated Date`
        FROM `stud_rec` as `sr`
        INNER JOIN `user` as `u`
            ON `u`.`id` = `sr`.`created_by_uid`
        INNER JOIN `user_info` as `ui`
            ON `ui`.`user_id` = `sr`.`created_by_uid`
        INNER JOIN `doc` as `d`
            ON `d`.`stud_rec_id` = `sr`.`id`
        INNER JOIN `remarks` as `rm`
            ON `rm`.`stud_rec_id` = `sr`.`id`
        WHERE `sr`.`created_by_uid` = '{$user_id}'";

        $fetch = $this->db->query($sql);

        return $fetch->num_rows() ? $fetch->result() : null;
    }


    /**
     * get the last record created by user
     * @param Integer $user_id
     */
    public function get_Last_Record_By_User($user_id)
    {
        $sql = "SELECT
            LPAD(`sr`.`id`, 6, '0') as `ID`,
            `sr`.`stud_mname` `Last Name`,
            `sr`.`stud_mname` `Middle Name`,
            `sr`.`stud_lname` `First Name`,
            `sr`.`stud_sfx` `Suffix`,
            `d`.regi_form `Regiform`,
            `d`.good_moral `Good Moral`,
            `d`.f137 `F137`,
            `d`.f138 `F138`,
            `d`.birth_cert `Birth Cert`,
            `d`.tor `TOR`,
            `d`.app_grad `App Grad`,
            `d`.cert_of_complete `Certificate of Completion`,
            `d`.req_clearance_form `Clearance Form`,
            `d`.req_credentials `Request Credential`,
            `d`.hd_or_cert_of_trans `HD or Cert of Trans`,
            `rm`.value `Remarks`,
            `rm`.category `Category` ,
            `u`.`uname` `Created By`,
            `sr`.`created_date` `Created Date`,
            `sr`.`updated_date` `Updated Date`
        FROM `stud_rec` as `sr`
        INNER JOIN `user` as `u`
            ON `u`.`id` = `sr`.`created_by_uid`
        INNER JOIN `user_info` as `ui`
            ON `ui`.`user_id` = `sr`.`created_by_uid`
        INNER JOIN `doc` as `d`
            ON `d`.`stud_rec_id` = `sr`.`id`
        INNER JOIN `remarks` as `rm`
            ON `rm`.`stud_rec_id` = `sr`.`id`
        WHERE `sr`.`created_by_uid` = '{$user_id}'
        ORDER BY `sr`.`id` DESC 
        LIMIT 1";

        $fetch = $this->db->query($sql);

        return $fetch->num_rows() ? $fetch->result() : null;
    }
}
