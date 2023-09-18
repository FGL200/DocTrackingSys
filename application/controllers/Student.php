<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use CodeIgniter\Files\File;
class Student extends CI_Controller{
    
    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("student_model", "std");
    }

    public function  addRecord() {
        $data = "";

        foreach($this->input->post() as $key => $val) {
            $val = trim($val);
            if(strstr($key, "stud_") && !empty($val)){
                if(!empty($data)) $data .= ",";
                $data .= "`{$key}` = '".$val."'";
            }
        }

        $user_id = "2"; // temporary user for encoding

        $data .= ", `user_id` = '{$user_id}'";

        $this->db->trans_start();

        $student_id = $this->std->addStudentInfo($data); 
 
        $data = ""; // reset the data for the next query

        foreach($this->input->post() as $key => $val) {
            $val = trim($val);
            if(strstr($key, "doc_val_") && !empty($val)){
                $key = explode("doc_val_", $key)[1];

                if(!empty($data)) $data .= ",";
                $data .= "`{$key}` = '".(1)."'";
                
            }
        }

        $data .= ", `stud_rec_id` = '{$student_id}'";

        $this->std->addStudentDoc($data);

        $this->db->trans_complete(); // commmit or rollback the transaction
       

        if($this->db->trans_status() === TRUE) {
            echo json_encode(array(
                "status" => "success"
            ));
        } else {
            echo json_encode(array(
                "status" => "error"
            ));

            exit();
        }


    }


    
}


?>