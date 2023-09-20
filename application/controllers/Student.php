<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Student extends CI_Controller{
    
    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("student_model", "std");
    }

    public function  addRecord() {

        /** Student Information checking */
        $required_fields = "";
        $input_columns = array('stud_fname', 'stud_mname', 'stud_lname');
        foreach($this->input->post() as $key=>$val) {
            if(in_array($key, $input_columns) && trim(empty($val))) {
                if(!empty(trim($required_fields))) $required_fields .= ",";
                $required_fields .= $key;
            }
        }
        if(!empty(trim($required_fields))) {
            echo json_encode(array('status'=>'error', 'message'=>'Text Fields not complete', 'columns'=>$required_fields));
            exit;
        }
        /** END Student Information checking */

        $data = "";

        /** Inserting data in `stud_rec` table */
        foreach($this->input->post() as $key => $val) {
            $val = trim($val);
            if(strstr($key, "stud_") && !empty($val)){
                $key = explode("stud_", $key)[1];
                if(!empty($data)) $data .= ",";
                $data .= "`{$key}` = '".$val."'";
            }
        }
        

        $user_id = "2"; // temporary user for encoding

        $data .= (!empty(trim($data)) ? ", " : null) . " `user_id` = '{$user_id}'";

        $this->db->trans_begin();

        $student_id = $this->std->addStudentInfo($data); 
        /** -- End of inserting data in `stud_rec` table -- */
 
        $data = ""; // reset the data for the next query

        /** Inserting data in `doc` table  */
        foreach($this->input->post() as $key => $val) {
            $val = trim($val);
            if(strstr($key, "doc_val_") && !empty($val)){
                $key = explode("doc_val_", $key)[1];

                if(!empty($data)) $data .= ",";
                $data .= "`{$key}` = '".(1)."'";
                
            }
        }

        if(!empty(trim($data))) {
            $data .= ", `stud_rec_id` = '{$student_id}'";
            $this->std->addStudentDoc($data);
        }

        /** -- End of inserting data in `doc` table --  */

        
        /** Uploading file  */
        $data = "";
        foreach($_FILES as $key => $val) {
            if(!empty($val['name']) && !empty($val['tmp_name'])) {
                if(!empty($data)) $data .= ",";

                $files_to_insert = $this->upload_file($key, $val, $student_id);

                if(!$files_to_insert)  {
                    $this->db->trans_rollback();
                    echo json_encode(['status'=>'error', 'message' => 'File upload error!']);
                    exit;
                };
                $data .= $files_to_insert;
            }
            
        }
        if(!empty($data)) {
            $data .= ', `stud_rec_id` = "'.$student_id.'"'; 
            $this->std->addStudentScanDoc($data);
        }

        /** End of Uploading file  */

        
        /** Inserting remarks */

        $data = "`stud_rec_id` = '{$student_id}'";
        $this->std->insertRemarks($data);

        /** End of inserting remarks */


        // $this->db->trans_complete(); // commmit or rollback the transaction
       

        if($this->db->trans_status() === TRUE) {
            $this->db->trans_commit();
            echo json_encode(array(
                "status" => "success"
            ));
        } else {
            $this->db->trans_rollback()();
            echo json_encode(array(
                "status" => "error"
            ));

            exit();
        }


    }

    public function upload_file($key, $val, $stud_rec_id) {
        if(!is_dir('uploads/')) mkdir('uploads/',0777, true);

        
        $path = "uploads/";

        $new_file_name = md5(time().$stud_rec_id);
        $file_ext = explode('.',$val['name']);
        $val['name'] = $new_file_name . '.' . ($file_ext[count($file_ext) - 1]);

        $new_file_path = $path . $val['name'];

        $key = join('', explode('doc_scan_', $key));
        $data = $new_file_path;
        return move_uploaded_file($val['tmp_name'], $new_file_path) ? "`{$key}`='{$data}'" : false;

    }

    public function get_Student_List() {
        echo json_encode(['result' => $this->std->get_StudRecs_Remarks()]);
    }

    


    

    
}


?>