<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Remarks_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function insertRemarks($data) {
        $query = "INSERT INTO `remarks` SET {$data}";
        $uid = $this->session->userdata('uid');
        add_To_User_Logs($this, $uid, "({$uid}) Added new Remarks to a record.", $query);
        $this->db->query($query);
    }
}

?>