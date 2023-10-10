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
                    CASE 
                        WHEN COALESCE(sr.stud_id,'') = '' THEN '--'
                        ELSE sr.stud_id
                    END `Student ID`,
                    CASE 
                        WHEN sr.stud_lname IS NULL OR COALESCE(sr.stud_lname, '') = '' THEN '--'
                        ELSE sr.stud_lname 
                    END `Last Name`,
                    CASE 
                        WHEN sr.stud_mname IS NULL OR COALESCE(sr.stud_mname, '') = '' THEN '--'
                        ELSE sr.stud_mname 
                    END `Middle Name`,
                    CASE 
                        WHEN sr.stud_fname IS NULL OR COALESCE(sr.stud_fname, '') = '' THEN '--'
                        ELSE sr.stud_fname 
                    END `First Name`,
                    CASE 
                        WHEN sr.stud_sfx IS NULL OR COALESCE(sr.stud_sfx, '') = '' THEN '--'
                        ELSE sr.stud_sfx 
                    END `Suffix`,
                    CASE 
                        WHEN rm.value = '[]' OR rm.value = '' THEN '--'
                        ELSE rm.value
                    END `Remarks`,
                    sr.`updated_date` `udate`,
                    sr.`created_date` `cdate`,
                    u.`uname` `cby`,
                    u2.`uname` `uby`
                FROM stud_rec sr
                INNER JOIN remarks rm 
                    ON rm.stud_rec_id = sr.id
                INNER JOIN `user` u
                    ON u.`id` = sr.`created_by_uid`
                LEFT JOIN `user` u2
                    ON u2.`id` = sr.`updated_by_uid`
                WHERE sr.deleted_flag = '0'
                ORDER BY `Student ID`
                    DESC
                -- GROUP BY 
                --     `Student ID`,
                --     `Last Name`,
                --     `Middle Name`,
                --     `First Name`,
                --     `Suffix`,
                --     `Remarks`,
                --     `udate`,
                --     `cdate`,
                --     `cby`,
                --     `uby`
                ";
        
        $fetch = $this->db->query($query);

        return $fetch->result_array();
    }

    /**
     * Get all data for specific student by `id`
     * @param Integer $id
     */
    public function get_Student_all_Record($id) {
        // $query = ' SELECT 
        //             `sr`.stud_lname `Last Name`,
        //             `sr`.stud_mname `Middle Name`,
        //             `sr`.stud_fname `First Name`,
        //             `d`.regi_form `Regiform`,
        //             `d`.good_moral `Good Moral`,
        //             `d`.j_f137 `JF137`,
        //             `d`.s_f137 `SF137`,
        //             `d`.f138 `F138`,
        //             `d`.birth_cert `Birth Cert`,
        //             `d`.tor `TOR`,
        //             `d`.app_grad `App Grad`,
        //             `d`.cert_of_complete `Certificate of Completion`,
        //             `d`.req_clearance_form `Clearance Form`,
        //             `d`.req_credentials `Request Credential`,
        //             `d`.hd_or_cert_of_trans `HD or Cert of Trans`,
        //             `rm`.value `Remarks`,
        //             `rm`.category `Category`
        //         FROM `stud_rec` sr
        //         LEFT JOIN `remarks` rm  
        //             ON rm.stud_rec_id = sr.id
        //         LEFT JOIN `doc` d
        //             ON  d.stud_rec_id = sr.id
                
        //         WHERE sr.id = "'.$id.'"
        // ';
        $query = ' SELECT 
                    `sr`.stud_id,
                    `sr`.stud_lname,
                    `sr`.stud_mname,
                    `sr`.stud_fname,
                    `sr`.stud_sfx,
                    `d`.regi_form,
                    `d`.good_moral,
                    `d`.j_f137,
                    `d`.s_f137,
                    `d`.f138,
                    `d`.birth_cert,
                    `d`.tor,
                    `d`.app_grad,
                    `d`.cert_of_complete,
                    `d`.req_clearance_form,
                    `d`.req_credentials,
                    `d`.hd_or_cert_of_trans,
                    `rm`.value
                FROM `stud_rec` sr
                LEFT JOIN `remarks` rm  
                    ON rm.stud_rec_id = sr.id
                LEFT JOIN `doc` d
                    ON  d.stud_rec_id = sr.id
                
                WHERE sr.id = ? AND sr.deleted_flag = "0"
        ';

        $fetch = $this->db->query($query, array($id));

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
                    CASE 
                        WHEN COALESCE(sr.stud_id,'') = '' THEN '--'
                        ELSE sr.stud_id
                    END `Student ID`,
                    CASE 
                        WHEN sr.stud_lname IS NULL OR COALESCE(sr.stud_lname, '') = '' THEN '--'
                        ELSE sr.stud_lname 
                    END `Last Name`,
                    CASE 
                        WHEN sr.stud_mname IS NULL OR COALESCE(sr.stud_mname, '') = '' THEN '--'
                        ELSE sr.stud_mname 
                    END `Middle Name`,
                    CASE 
                        WHEN sr.stud_fname IS NULL OR COALESCE(sr.stud_fname, '') = '' THEN '--'
                        ELSE sr.stud_fname 
                    END `First Name`,
                    CASE 
                        WHEN sr.stud_sfx IS NULL OR COALESCE(sr.stud_sfx, '') = '' THEN '--'
                        ELSE sr.stud_sfx 
                    END `Suffix`,
                    CASE 
                        WHEN rm.value = '[]' OR rm.value = '' THEN '--'
                        ELSE rm.value
                    END `Remarks`,
                    sr.`updated_date` `udate`,
                    sr.`created_date` `cdate`,
                    u.`uname` `cby`,
                    u2.`uname` `uby`
                FROM stud_rec sr
                INNER JOIN remarks rm 
                    ON rm.stud_rec_id = sr.id
                INNER JOIN `user` u
                    ON u.`id` = sr.`created_by_uid`
                LEFT JOIN `user` u2
                    ON u2.`id` = sr.`updated_by_uid`
                WHERE 
                    `sr`.`created_by_uid` = ? AND
                    `sr`.deleted_flag = '0'
                ORDER BY `Student ID`
                    DESC
        
        ";

        $fetch = $this->db->query($sql, array($user_id));

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
            `sr`.`stud_lname` `Last Name`,
            `sr`.`stud_mname` `Middle Name`,
            `sr`.`stud_fname` `First Name`,
            `sr`.`stud_sfx` `Suffix`,
            `d`.regi_form `Regiform`,
            `d`.good_moral `Good Moral`,
            `d`.j_f137 `JF137`,
            `d`.s_f137 `SF137`,
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
        WHERE `sr`.`created_by_uid` = '{$user_id}' AND `sr`.deleted_flag = '0'
        ORDER BY `sr`.`id` DESC 
        LIMIT 1";

        $fetch = $this->db->query($sql);

        return $fetch->num_rows() ? $fetch->result_array() : [];
    }


    /**
     * Get the docs of the student
     * @param String $stud_id
     */
    public function stud_docs($stud_id) {
        $sql = "SELECT * FROM `doc` WHERE `stud_rec_id` = '$stud_id' LIMIT 1";

        $result = $this->db->query($sql);

        return $result->num_rows() ? $result->result_array() : [];
    }   

    /**
     * Update the data of the specific table
     * @param String $tblname
     * @param String $data
     * @param String $condition
     */
    public function update_data($tblname, $data, $condition) {
        $sql = "UPDATE `{$tblname}` SET {$data} $condition";
        $result = $this->db->query($sql);
        return $this->db->affected_rows() ? true : false;
    }


    public function filter_student($conditions) {
        $sql = "
        \rSELECT 
        \r    LPAD(sr.id, 6, '0') `Record ID`,
        \r    CASE 
        \r        WHEN COALESCE(sr.stud_id,'') = '' THEN '--'
        \r        ELSE sr.stud_id
        \r    END `Student ID`,
        \r    CASE 
        \r        WHEN sr.stud_lname IS NULL OR COALESCE(sr.stud_lname, '') = '' THEN '--'
        \r        ELSE sr.stud_lname 
        \r    END `Last Name`,
        \r    CASE 
        \r        WHEN sr.stud_mname IS NULL OR COALESCE(sr.stud_mname, '') = '' THEN '--'
        \r        ELSE sr.stud_mname 
        \r    END `Middle Name`,
        \r    CASE 
        \r        WHEN sr.stud_fname IS NULL OR COALESCE(sr.stud_fname, '') = '' THEN '--'
        \r        ELSE sr.stud_fname 
        \r    END `First Name`,
        \r    CASE 
        \r        WHEN sr.stud_sfx IS NULL OR COALESCE(sr.stud_sfx, '') = '' THEN '--'
        \r        ELSE sr.stud_sfx 
        \r    END `Suffix`,
        \r    CASE 
        \r        WHEN rm.value = '[]' OR rm.value = '' THEN '--'
        \r        ELSE rm.value
        \r    END `Remarks`,
        \r    sr.`updated_date` `udate`,
        \r    sr.`created_date` `cdate`,
        \r    u.`uname` `cby`,
        \r    u2.`uname` `uby`
        \rFROM  stud_rec as `sr`
        \rJOIN remarks `rm`
        \r    ON `rm`.stud_rec_id = `sr`.id
        \rJOIN doc `d`
        \r    ON `d`.stud_rec_id = `sr`.id 
        \rLEFT JOIN user_info `ui`
        \r    ON `ui`.user_id = `sr`.created_by_uid
        \rLEFT JOIN user `u`
        \r    ON `u`.id = `sr`.created_by_uid
        \rLEFT JOIN user `u2`
        \r    ON `u2`.id = `sr`.updated_by_uid
        \rWHERE $conditions AND `sr`.deleted_flag = '0'";

        $result = $this->db->query($sql);
        return $result->num_rows() ? ["sql" => $sql, "data" => $result->result_array()] : [];
    }
                            



}

?>