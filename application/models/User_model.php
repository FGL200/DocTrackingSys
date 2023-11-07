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

    // For user_info table
    public function update_user_info($data)
    {   
        $sql = "UPDATE user_info `ui`
                INNER JOIN `user` `u`
                    ON `u`.`id` = `ui`.`user_id`
                SET {$data}";
        // echo $sql; die;
        $fetch = $this->db->query($sql);
        return $fetch ? true : false;
    }

    // For user table 
    public function update_user($data)
    {   
        $sql = "UPDATE `user` `u`
                SET {$data}";

        // echo $sql; die;
        $fetch = $this->db->query($sql);
        return $fetch ? true : false;
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
                WHERE `u`.uname = ? AND `u`.pword = PASSWORD(?) AND `u`.active = '1'
                LIMIT 1
                ";
        $fetch = $this->db->query($query, array($username, $password));

        return $fetch->num_rows() ? $fetch->result_array()[0]  : [];
    }

    public function get_All_Viewers($my_user_id){
        if(!$this->user_Is_Admin($my_user_id)) return [];
        $query = "  SELECT 
                        `id` `User ID`,
                        `uname` `Username`,
                        `active` `Status`,
                        `role` `Role`
                    FROM `user`
                    WHERE `role` = 'V'
        ";
        $fetch = $this->db->query($query);
        return $fetch->num_rows() ? $fetch->result_array() : [];
    }

    public function get_All_Encoders($my_user_id){
        if(!$this->user_Is_Admin($my_user_id)) return [];
        $query = "  SELECT 
                        `id` `User ID`,
                        `uname` `Username`,
                        `active` `Status`,
                        `role` `Role`
                    FROM `user`
                    WHERE `role` = 'E'
        ";
        $fetch = $this->db->query($query);
        return $fetch->num_rows() ? $fetch->result_array() : [];
    }

    public function  get_All_Users($my_user_id) {
        if(!$this->user_Is_Admin($my_user_id)) return [];
        $query = "  SELECT 
                        `id` `User ID`,
                        `uname` `Username`,
                        `active` `Status`,
                        `role` `Role`
                    FROM `user`
                    WHERE `id` <> ?
        ";
        $fetch = $this->db->query($query, array($my_user_id));
        return $fetch->num_rows() ? $fetch->result_array() : [];
    }

    public function get_user(Int $requesterId,Int $userId) {
        if(!$this->__is_currently_logged_in__($requesterId)) return [];
        if(!$this->user_Is_Admin($requesterId)) if($requesterId !== $userId) return[];

        $query = "SELECT
                    u.`id`,
                    u.`uname`,
                    u.`active`,
                    u.`role`,
                    i.`fname`,
                    i.`mname`,
                    i.`lname`,
                    i.`bday`,
                    i.`gender`
                FROM `user` u
                INNER JOIN `user_info` i
                    ON i.`user_id` = u.`id`
                WHERE u.`id` = {$userId}
                LIMIT 1
        ";
        $fetch = $this->db->query($query);
        return $fetch->num_rows() ? $fetch->result_array() : [];
    }

    /**
     * User total encoded data in current day
     */
    public function get_Total_Encoded_By_Users() {
        $current_day = date("Y-m-d");
        
        $sql = "SELECT 
                    `u`.`uname`,
                    CAST(count(*) as int) as `total`
                FROM `stud_rec` as `sr` 
                JOIN user `u`
                    ON `u`.id =  `sr`.`created_by_uid`
                WHERE 
                    CAST(`sr`.`created_date` as DATE) = '".$current_day."' AND 
                    `u`.active = '1' AND 
                    `u`.role = 'E'
                GROUP BY `sr`.`created_by_uid`";

        $fetch = $this->db->query($sql);

        return $fetch->result();
    }

    /** 
     * Encoded records by users every month
     */
    public function get_Monthly_Encoded_By_Users() {
        $sql = "SELECT
                    `u`.`uname`,
                    MAX(DATE(`sr`.`created_date`)) as `date`,
                    count(*) as `total`
                FROM `stud_rec` as `sr`
                INNER JOIN `user` as `u`
                ON `u`.`id` = `sr`.`created_by_uid`
                GROUP BY `sr`.`created_by_uid`, DATE_FORMAT(`sr`.`created_date`, '%M')";

        // echo $sql;
        $fetch = $this->db->query($sql);

        return $fetch->result();
    }


    /**
     * Get the all the password of the user
     * @param Int $uid
     * @param String $oldPass
     */

     public function get_Old_Password($uid, $oldPass) {
        $sql = "
            SELECT 
                `u`.pword
            FROM user `u`
            WHERE `u`.id = ? AND `u`.pword = PASSWORD(?) AND `u`.active = '1'
            LIMIT 1
        ";

        $result = $this->db->query($sql, array($uid, $oldPass));

        return $result->row();
     }



    /** PRIVATE FUNCTIONS */

    private function __is_currently_logged_in__(Int $uid){
        return $uid === intval($this->session->get_userdata('user')['uid']);
    }

    private function user_Is_Admin($uid) {
        $query = "  SELECT 
                        `role`
                    FROM `user`
                    WHERE `id` = '{$uid}'
                    LIMIT 1
        ";
        $fetch = $this->db->query($query);
        if($fetch->num_rows()){
            return $fetch->result_array()[0]['role'] === 'A' ? true : false;
        }
        return false;
    }
}
