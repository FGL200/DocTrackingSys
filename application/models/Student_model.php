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

    public function get_StudRecs_Remarks() {
        $query = "SELECT 
                        LPAD(sr.id, 6, '0') `Record ID`,
                        sr.stud_fname `First Name`,
                        sr.stud_mname `Middle Name`,
                        sr.stud_lname `Last Name`,
                        sr.stud_sfx `Suffix`,
                        rm.value `Remarks`,
                        rm.category `Category`
                    FROM stud_rec sr
                    LEFT JOIN remarks rm 
                        ON rm.stud_rec_id = sr.id";
        
        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result() : null;
    }

    public function get_Student_all_Record($id) {
        $query = ' SELECT 
                    sr.stud_fname `First Name`,
                    sr.stud_mname `Middle Name`,
                    sr.stud_lname `Last Name`,
                    d.regi_form `Regiform`,
                    d.good_moral `Good Moral`,
                    d.f137 `F137`,
                    d.f138 `F138`,
                    d.birth_cert `Birth Cert`,
                    d.tor `TOR`,
                    d.app_grad `App Grad`,
                    d.cert_of_complete `Certificate of Completion`,
                    d.req_clearance_form `Clearance Form`,
                    d.req_credentials `Request Credential`,
                    d.hd_or_cert_of_trans `HD or Cert of Trans`,
                    rm.value `Remarks`,
                    rm.category `Category`
                FROM `stud_rec` sr
                LEFT JOIN `remarks` rm  
                    ON rm.stud_rec_id = sr.id
                LEFT JOIN `doc` d
                    ON  d.stud_rec_id = sr.id
                
                WHERE sr.id = "'.$id.'"
        ';

        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result()[0] : null;

    }
}

?>