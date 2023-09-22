<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Student extends CI_Controller{
    
    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("student_model", "std");
        $this->load->model("remarks_model", "rm");
    }

    /**
     * Add student record
     */
    public function  addRecord() {

        /** Student Information checking */
        $required_fields = "";
        $input_columns = array('stud_fname',  'stud_lname');
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
                if(!empty($data)) $data .= ",";
                $data .= "`{$key}` = '{$val}'";
            }
        }
        

        $created_by_uid = $this->session->userdata('uid') ? $this->session->userdata('uid') : '2' ; //  user id for encoding

        $data .=  ", `created_by_uid` = '{$created_by_uid}'";

        $this->db->trans_begin();

        $student_id = $this->std->addStudentInfo($data); 
        /** -- End of inserting data in `stud_rec` table -- */
 
        $data = ""; // reset the data for the next query

        /** Inserting data in `doc` table  */

        $docs = array('regi_form', 'good_moral', 'f137', 'f138', 'birth_cert', 'tor', 'app_grad', 'cert_of_complete', 'req_clearance_form', 'req_credentials', 'hd_or_cert_of_trans');

        foreach($docs as $doc) {
            if(!empty($data)) $data .= ", ";

            $doc_val = $this->input->post('doc_val_'.$doc) ? '1' : '0';
 
            $path = !empty($_FILES['doc_scan_' . $doc]['name']) ?  $this->upload_file($_FILES['doc_scan_' . $doc], $student_id) : '';
            $data .= "`$doc` = '{\"val\" : \"$doc_val\", \"dir\" : \"$path\"}'";
        }
        

        $data .= ", `stud_rec_id` = '{$student_id}'";
        $this->std->addStudentDoc($data);
    

        /** -- End of inserting data in `doc` table --  */

        
        /** Inserting remarks */
        $data = "";
        $remark_value = "`value` = '". (trim($this->input->post('remarks_value')))."', ";
        $remark_category = $this->input->post('remarks-category') ? " `category` = '" . (trim($this->input->post('remarks-category'))). "', " : null;

        $data .= ($remark_value . $remark_category . "`stud_rec_id` = '{$student_id}'");
        $this->rm->insertRemarks($data);
        

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

    /**
     * Upload student documents
     * @param Array $file
     * @param Integer $stud_rec_id
     */
    public function upload_file($file, $stud_rec_id) {
        if(!is_dir('uploads/')) mkdir('uploads/',DIR_WRITE_MODE, true);

        
        $path = "uploads/";

        $new_file_name = md5(time().$stud_rec_id);
        $file_ext = explode('.',$file['name']);
        $file['name'] = $new_file_name . '.' . ($file_ext[count($file_ext) - 1]);

        $new_file_path = $path . $file['name'];

        $data = $new_file_path;
        return move_uploaded_file($file['tmp_name'], $new_file_path) ? $data : null;

    }

    public function get_All_Student_List() {
        echo json_encode(['result' => $this->std->get_StudRecs_Remarks()]);
    }

    public function get_Student_Records($id) {
        echo json_encode(['result' => $this->std->get_Student_all_Record($id)]);
    }

    


    

    
}


?>