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
        $this->db->query($query);
    }

    public function getRemarks() {
        $query = 'SELECT rm.value from remarks rm
                join stud_rec sr
                on sr.id = rm.stud_rec_id
                where rm.value != "[]" AND  rm.value != "" AND sr.is_merged != 1';
        return ($this->db->query($query)->result_array());
    }
}

?>