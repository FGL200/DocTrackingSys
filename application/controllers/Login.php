<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    public function index() {
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        $query = "SELECT 
                        `i`.fname,
                        `i`.lname,
                        `i`.mname,
                        `u`.id,
                        `u`.role 
                FROM `info` as `i` 
                JOIN `user` as `u` 
                    ON `u`.id = `i`.user_id
                WHERE `u`.uname = '{$username}' AND `u`.pword = PASSWORD('{$password}') AND `u`.active = '1'
                LIMIT 1
                ";
        $fetch = $this->db->query($query);
        
        return $fetch->num_rows() ? $fetch->result()[0]  : null;
    }

}



?>