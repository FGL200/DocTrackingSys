<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function insert_user($data) {
        $query = "INSERT INTO `user` SET {$data}";
        $result = $this->db->query($query);
        return $result ? $this->db->insert_id() : false;
    }

    public function insert_user_info($data){
        $query = "INSERT INTO `user_info` SET {$data}";
        $result = $this->db->query($query);
        return $result ? $this->db->insert_id() : false;
    }

    public function update_user_info($data){
        //update info

    }

    public function login_user($username, $password) {
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
}