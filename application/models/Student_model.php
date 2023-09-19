<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Student_model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
    }


    public function addStudentInfo($data) {
        $query = "INSERT INTO `stud_rec` SET {$data}";
        $result = $this->db->query($query);
        return $result ? $this->db->insert_id() : false;
    }

    public function addStudentDoc($data) {
        $query = "INSERT INTO `doc` SET {$data}";
        $this->db->query($query);
    }

    public function addStudentScanDoc($data) {
        $query = "INSERT INTO `scan` SET {$data}";
        $this->db->query($query);
    }
}

?>