<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Student_model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Insert into `stud_rec`
     * @param String $data
     */
    public function addStudentInfo($data) {
        $query = "INSERT INTO `stud_rec` SET {$data}";
        $result = $this->db->query($query);
        return $result ? $this->db->insert_id() : false;
    }
    /**
     * Insert into `doc`
     * @param String $data
     */
    public function addStudentDoc($data) {
        $query = "INSERT INTO `doc` SET {$data}";
        $this->db->query($query);
    }

    public function get_StudentRecords_With_Remarks() {
        $query = "SELECT 
                        LPAD(sr.id, 6, '0') `Record ID`,
                        sr.stud_id `Student ID`,
                        sr.stud_fname `First Name`,
                        sr.stud_mname `Middle Name`,
                        sr.stud_lname `Last Name`,
                        sr.stud_mname `Middle Name`,
                        sr.stud_fname `First Name`,
                        sr.stud_sfx `Suffix`,
                        rm.value `Remarks`
                    FROM stud_rec sr
                    LEFT JOIN remarks rm 
                        ON rm.stud_rec_id = sr.id";
        
        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result_array() : null;
    }

    /**
     * Get all data for specific student by `id`
     * @param Integer $id
     */
    public function get_Student_all_Record($id) {
        $query = ' SELECT 
                    `sr`.stud_lname `Last Name`,
                    `sr`.stud_mname `Middle Name`,
                    `sr`.stud_fname `First Name`,
                    `d`.regi_form `Regiform`,
                    `d`.good_moral `Good Moral`,
                    `d`.j_f137 `JF137`,
                    `d`.s_f137 `sF137`,
                    `d`.f138 `F138`,
                    `d`.birth_cert `Birth Cert`,
                    `d`.tor `TOR`,
                    `d`.app_grad `App Grad`,
                    `d`.cert_of_complete `Certificate of Completion`,
                    `d`.req_clearance_form `Clearance Form`,
                    `d`.req_credentials `Request Credential`,
                    `d`.hd_or_cert_of_trans `HD or Cert of Trans`,
                    `rm`.value `Remarks`,
                    `rm`.category `Category`
                FROM `stud_rec` sr
                LEFT JOIN `remarks` rm  
                    ON rm.stud_rec_id = sr.id
                LEFT JOIN `doc` d
                    ON  d.stud_rec_id = sr.id
                
                WHERE sr.id = "'.$id.'"
        ';

        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result_array()[0] : null;
    }

    

    /**
     * All the records of the student created by specific user
     * @param Integer $user_id
     */
    public function get_Student_Records_By($user_id)
    {
        $sql = "SELECT 
            LPAD(sr.id, 6, '0') `Record ID`,
            sr.stud_id `Student ID`,
            sr.stud_fname `First Name`,
            sr.stud_mname `Middle Name`,
            sr.stud_lname `Last Name`,
            sr.stud_mname `Middle Name`,
            sr.stud_fname `First Name`,
            sr.stud_sfx `Suffix`,
            rm.value `Remarks`
        FROM stud_rec sr
        LEFT JOIN remarks rm 
            ON rm.stud_rec_id = sr.id
        WHERE `sr`.`created_by_uid` = '{$user_id}'";

        $fetch = $this->db->query($sql);

        return $fetch->num_rows() ? $fetch->result_array() : [];
    }


    /**
     * get the last record created by user
     * @param Integer $user_id
     */
    public function get_Last_Record_By_User($user_id)
    {
        $sql = "SELECT
            LPAD(`sr`.`id`, 6, '0') `Record ID`,
            `sr`.`stud_mname` `Last Name`,
            `sr`.`stud_mname` `Middle Name`,
            `sr`.`stud_lname` `First Name`,
            `sr`.`stud_sfx` `Suffix`,
            `d`.regi_form `Regiform`,
            `d`.good_moral `Good Moral`,
            `d`.j_f137 `JF137`,
            `d`.s_f137 `sF137`,
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

        return $fetch->num_rows() ? $fetch->result_array() : [];
    }
}

?>