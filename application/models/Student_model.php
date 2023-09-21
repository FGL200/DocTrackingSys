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
                        sr.stud_fname,
                        sr.stud_mname,
                        sr.stud_lname,
                        rm.value,
                        rm.category
                    FROM stud_rec sr
                    JOIN remarks rm 
                        ON rm.stud_rec_id = sr.id';
        
        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result() : null;
    }

    public function get_Student_all_Record($id) {
        $query = ' SELECT 
                    sr.stud_fname,
                    sr.stud_mname,
                    sr.stud_lname,
                    sc.regi_form `sc_regi_form`,
                    sc.good_moral `sc_good_moral`,
                    sc.f137 `sc_f137`,
                    sc.f138 `sc_f138`,
                    sc.birth_cert `sc_birth_cert`,
                    sc.tor `sc_tor`,
                    sc.app_grad `sc_app_grad`,
                    sc.cert_of_complete `sc_cert_of_complete`,
                    sc.req_clearance_form `sc_req_clearance_form`,
                    sc.req_credentials `sc_req_credentials`,
                    sc.hd_or_cert_of_trans `sc_hd_or_cert_of_trans`,
                    d.regi_form `doc_regi_form`,
                    d.good_moral `doc_good_moral`,
                    d.f137 `doc_f137`,
                    d.f138 `doc_f138`,
                    d.birth_cert `doc_birth_cert`,
                    d.tor `doc_tor`,
                    d.app_grad `doc_app_grad`,
                    d.cert_of_complete `doc_cert_of_complete`,
                    d.req_clearance_form `doc_req_clearance_form`,
                    d.req_credentials `doc_req_credentials`,
                    d.hd_or_cert_of_trans `doc_hd_or_cert_of_trans`,
                    rm.value,
                    rm.category
                FROM `stud_rec` sr
                LEFT JOIN `remarks` rm  
                    ON rm.stud_rec_id = sr.id
                LEFT JOIN `scan` sc
                    ON  sc.stud_rec_id = sr.id
                LEFT JOIN `doc` d
                    ON  d.stud_rec_id = sr.id
                
                WHERE sr.id = "'.$id.'"
        ';

        $fetch = $this->db->query($query);

        return $fetch->num_rows() ? $fetch->result()[0] : null;

    }
}

?>