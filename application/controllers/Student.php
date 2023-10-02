<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Student extends CI_Controller{

    private $user_docs = array('regi_form', 'good_moral', 'j_f137','s_f137', 'f138', 'birth_cert', 'tor', 'app_grad', 'cert_of_complete', 'req_clearance_form', 'req_credentials', 'hd_or_cert_of_trans');
    
    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("student_model", "stud");
        $this->load->model("remarks_model", "rm");
        $this->load->model("user_model", 'user');

    }

    /**
     * Add student record
     */
    public function  addRecord() {
        /** Student Information checking */
        $required_fields = "";
        $input_columns = array('stud_fname',  'stud_lname');
        foreach($this->input->post() as $key=>$val) {
            if(in_array($key, $input_columns) && empty(trim($val))) {
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
        

        $created_by_uid = $this->session->userdata('uid') ? $this->session->userdata('uid') : '1' ; //  user id for encoding

        $data .=  ", `created_by_uid` = '{$created_by_uid}'";

        $this->db->trans_begin();

        $student_id = $this->stud->addStudentInfo($data);
        /** -- End of inserting data in `stud_rec` table -- */
 
        $data = ""; // reset the data for the next query

        /** Inserting data in `doc` table  */

        foreach($this->user_docs as $doc) {
            if(!empty($data)) $data .= ", ";

            $doc_val = $this->input->post('doc_val_'.$doc) ? '1' : '0';
 
            $path = !empty($_FILES['doc_scan_' . $doc]['name']) ?  $this->upload_file($_FILES['doc_scan_' . $doc], $student_id) : '';
            $data .= "`$doc` = '{\"val\" : \"$doc_val\", \"dir\" : \"$path\"}'";
        }
        

        $data .= ", `stud_rec_id` = '{$student_id}'";
        $this->stud->addStudentDoc($data);
    

        /** -- End of inserting data in `doc` table --  */

        
        /** Inserting remarks */
        $data = "";
        $remark_value = "`value` = '[";
       
        $remarks = [];
        
        if($this->input->post('remarks')) $remarks += explode(',', $this->input->post('remarks'));
        if($this->input->post('_remarksValue_other')) array_push($remarks, $this->input->post('_remarksValue_other'));

        foreach($remarks as &$r) {
            $r = "\"$r\""; // Enclose string to " "
        } 

        $remark_value .= implode(',', $remarks);
        $remark_value .= "]', ";

        $data .= ($remark_value . "`stud_rec_id` = '{$student_id}'");
        $this->rm->insertRemarks($data);
        /** End of inserting remarks */

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
     * Get basic student record info along with their remarks
     */
    public function get_StudentRecords_With_Remarks() {
        $result = $this->stud->get_StudentRecords_With_Remarks();
        $newData = $this->__id_link_Student_Record__($result);
        $nData = $this->count_remarks($newData);
        echo json_encode(['result' => $nData]);
    }

    /**
     * Get specific student record info along with their remarks
     * @param Integer $id The `stud_rec`.`id`
     */
    public function get_Student_Records(int $id) {
        echo json_encode(['result' => $this->stud->get_Student_all_Record($id)]);
    }

    /**
     * Get basic student record info along with their remarks added by `user`
     * @param Integer $user_id The `id` of user logged in
     */
    public function get_Student_Records_By(int $user_id) {
        $result = $this->stud->get_Student_Records_By($user_id);
        $newData = $this->__id_link_Student_Record__($result);
        $nData = $this->count_remarks($newData);
        echo json_encode(['result' => $nData]);
    }

    /**
     * Get the last `stud_rec` inserted by `user`
     * @param Integer $user_id The `id` of user logged in
     */
    public function get_Last_Student_Records_By(int $user_id) {
        echo json_encode(['result' => $this->stud->get_Last_Record_By_User($user_id)]);  
    }


    public function update_Student_Records() {
        $data = $this->input->post();

        $stud_rec_id = intval($data['stud_rec_id']);

        $stud_set = "";

        /** Update the `stud_rec` table */
        foreach($data as $key=>$val) {
            if(strstr($key, 'stud_')&& !strstr($key, 'rec_id')) {
                if(!empty($stud_set)) $stud_set .= ",";
                $stud_set.="`$key` = '$val'";
            }
        }
        $this->db->trans_begin();

        $this->stud->update_data('stud_rec', $stud_set, "WHERE `id` = $stud_rec_id");
        
        /** End Update the `stud_rec` table */

        $remark_value = "`value` = '[";
       
        $remarks = [];
        
        if($this->input->post('remarks')) $remarks += explode(',', $this->input->post('remarks'));
        if($this->input->post('_remarksValue_other')) array_push($remarks, $this->input->post('_remarksValue_other'));

        foreach($remarks as &$r) {
            $r = "\"$r\""; // Enclose string to " "
        } 

        $remark_value .= implode(',', $remarks);
        $remark_value .= "]'";

        $this->stud->update_data('remarks', $remark_value, "WHERE `stud_rec_id` = $stud_rec_id");
        
        /** Update `doc` table  */
        $doc_set = "";
        
        foreach($this->user_docs as $doc) {
            $path = "";

            if(!empty($doc_set)) $doc_set .= ", ";

            $doc_val = $this->input->post('doc_val_'.$doc) ? '1' : '0';
            
            if($this->input->post('doc_scan_' . $doc)) {
                $path = $this->input->post('doc_scan_' . $doc);
            }
            
            if(!empty($_FILES['doc_scan_' . $doc]['name'])) {
                $path =  $this->upload_file($_FILES['doc_scan_' . $doc], $stud_rec_id);
            }

            if(empty($path) || !empty($_FILES['doc_scan_' . $doc]['name'])) {  
                $old_path = $this->get_doc_dir($stud_rec_id, $doc);
                if($old_path) $this->delete_Image($old_path);
            }
             
            $doc_set .= "`$doc` = '{\"val\" : \"$doc_val\", \"dir\" : \"$path\"}'";
        }
        $this->stud->update_data('doc', $doc_set, "WHERE `stud_rec_id` = $stud_rec_id");
        $this->stud->update_data('stud_rec'," `updated_date` ='". date('Y-m-d H:i:s')."', `updated_by_uid` = '".$this->session->userdata('uid')."'", " WHERE `id` = $stud_rec_id");
        /** End Update `doc` table  */


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


    /** PRIVATE FUNCTIONS */


    /**
     * Change the `Record ID` column to a link in `stud_rec` table
     * @param Array $array query result 
     */
    private function __id_link_Student_Record__(Array $array) {
        if(count($array) === 0) return [];
        $fixedData = [];
        foreach ($array as $row){
            $newRow = [];
            foreach($row as $key => $val){
                if($key == 'Record ID')
                    $newRow[$key] = '<a class="stud_rec_id_link" href="'.base_url('record/'.$val).'" target="_blank">'.$val.'</a>';
                else
                    $newRow[$key] = $val;
            }
            array_push($fixedData, $newRow);
        }
        return $fixedData;
    }

    /**
     * Upload student documents
     * @param Array $file
     * @param Integer $stud_rec_id
     */
    private function upload_file(Array $file, int $stud_rec_ID) {
        if(!is_dir('uploads/')) mkdir('uploads/',DIR_WRITE_MODE, true);

        
        $path = "uploads/";

        $new_file_name = md5((rand() * $stud_rec_ID));
        $file_ext = explode('.',$file['name']);
        $file['name'] = $new_file_name . '.' . ($file_ext[count($file_ext) - 1]);

        $new_file_path = $path . $file['name'];

        $data = $new_file_path;
        return move_uploaded_file($file['tmp_name'], $new_file_path) ? $data : null;

    }
    
    
    /**
     * Get the doc dir of the student
     * @param int $stud_id
     * @param String $key 
     */
    private function get_doc_dir(int $stud_id, String $key) {
        return json_decode($this->stud->stud_docs($stud_id)[0][$key])->dir;
    }

    /**
     * Delete the uploaded file
     * @param String $dir
     */
    private function delete_Image(String $dir) {
        if(!empty($dir) && is_file("C:\\xampp\\htdocs\\DocTrackingSys\\".$dir)) {
            return unlink("c:/xampp/htdocs/DocTrackingSys/".$dir);
        }
    }


    private function to_Hoverable(int $count, String $value) {
        return "<div title='{$value}' style='cursor: context-menu;'>".($count===0?"--":$count." Remarks")."</div>";
    }

    /**
     * Count the remarks of the student 
     * @param Array $data
     * 
     */
    private function count_remarks(Array $data) {
        if(count($data) < 1) return;
        $fixed_data = [];
        
        foreach($data as $row) {
            
            if(empty($row['Remarks'])) $row['Remarks'] = $this->to_Hoverable(0, "No remarks");
            else if($row['Remarks'] === '--') $row['Remarks'] = $this->to_Hoverable(0, "No remarks");
            else if(str_contains($row['Remarks'], "[")) $row['Remarks'] = $this->to_Hoverable(count(json_decode($row['Remarks'])), $row['Remarks']); 
            else $row['Remarks'] = $this->to_Hoverable(1, $row['Remarks']);

            array_push($fixed_data, $row);
        }

        return $fixed_data;
    }
}
