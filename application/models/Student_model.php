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

    public function insertRemarks($data) {
        $query = "INSERT INTO `remarks` SET {$data}";
        $this->db->query($query);
    }

    public function get_StudRecs_Remarks() {
        $query = 'SELECT 
                        sr.fname,
                        sr.mname,
                        sr.lname,
                        rm.value,
                        rm.category
                    FROM remarks rm
                    JOIN stud_rec sr
                        ON sr.id = rm.stud_rec_id';
        
        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result() : null;
    }
}

?>