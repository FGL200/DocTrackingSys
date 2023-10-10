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
                    WHERE `id` <> '{$my_user_id}'
        ";
        $fetch = $this->db->query($query);
        return $fetch->num_rows() ? $fetch->result_array() : [];
    }

    public function get_user(Int $uid) {
        if(!$this->__is_currently_logged_in__($uid)) return [];

        $query = "SELECT
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
                WHERE u.`id` = {$uid}
        ";
        $fetch = $this->db->query($query);
        return $fetch->num_rows() ? $fetch->result_array() : [];
    }






    /** PRIVATE FUNCTIONS */

    private function __is_currently_logged_in__($uid){
        return $uid === $this->sesstion->user_data('user')['uid'];
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
