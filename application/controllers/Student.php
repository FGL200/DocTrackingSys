<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Student extends CI_Controller{    
    public function __construct()
    {
        
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent

        $this->load->model("student_model", "stud");
        $this->load->model("remarks_model", "rm");
        $this->load->model("user_model", 'user');
        $this->load->model("excel_model", 'excel');
        $this->load->model("shelf_model", "shelf");
        /** File uploder helper */
        // $this->load->helper(array("form", "url"));

    }
    /**
     * Add student/s via excel
     */

     public function addExcel() {
        $students = json_decode($this->input->post("students")); 
        $id = 0;
        
        $created_by_uid = $this->session->userdata('uid');
        $shelfid = $this->shelf->getShelfId($this->input->post('shelf'));

        $filename = $this->input->post("filename");
        
        if(!$this->excel->isFileExisted($filename)) {
            $this->db->trans_begin();

            $total_inserted = 0; // will store how many data has been added  to database from the uploaded excel

            $excel_query = "`name` = '{$filename}', `uploaded_by` = '{$created_by_uid}'";
            $excel_id = $this->excel->addFile($excel_query);
            
    
            if(!$excel_id) {echo json_encode(['status'=>'error', 'message' => $this->db->error()['message']]); die;}
    
            for($i = 0; $i < count($students); $i++) {
                
                $studrec = " `x_file_id` = '{$excel_id}', `created_by_uid` = '{$created_by_uid}'," . $students[$i][0];
    
                $id = $this->stud->add_student($studrec);
    
                $student_id = "`stud_rec_id` = {$id}, ";
    
                $doc = $student_id . $students[$i][1] . ", `shelf` = '{$shelfid}'";
                
                $this->stud->addStudentDoc($doc);
                
                $remarks = " `value`='[]', `stud_rec_id` = '{$id}'";
                $this->rm->insertRemarks($remarks);

                $total_inserted+=1;
            }
    
            
    
            if($this->db->error()['code'] > 0)  echo json_encode(['status'=>'error', 'message'=>$this->db->error()['message']]);
            else { echo json_encode(['status'=>'success', 'message'=> "<b>{$total_inserted}</b> records inserted successfully"]); $this->db->trans_commit();}
        } else {
            echo json_encode(['status'=>'error', 'message'=>'<b>File is already existed..</b> Please rename the file.']);
        }

        
     }

    /**
     * Add student record
     */
    public function  addRecord() {
        // $result = $this->db->query('INSERT INTO `stud_rec` (`stud_lname`,`stud_fname`,`stud_mname`,`stud_sfx`) VALUES ("DA","CARLO ","R.",""),("DAA","PERLA","S.",""),("DAA ","BARRY","M.",""),("DAACA","CHRIS JOHN ","M.",""),("DAACA","IAN SAM","M.",""),("DAAN","KRISTINA MAY ","C.",""),("DAAN","MARIANETTE J","P.",""),("DAANG","REMY JOY","E.",""),("DAANOY","ARNOLD","E.",""),("DAAPONG ","MELCHOR","J.",""),("DABALOS","ALLEN OLIVEVER","B.",""),("DABALOS","MARIA TERESSA","C.",""),("DABALOS","NICOLE","C.",""),("DABALUS","JOEFFREN","B.",""),("DABAN","PAUL JOHN","N.",""),("DABAN","PHILIP.","S.",""),("DABAN","PRIMO","E.",""),("DABANBAN","STEFFANIE JANE","A.",""),("DABANBAN","IVAN PHILLIP","C.",""),("DABAY","RICHARD","B.",""),("DABBAN","DIVINE GRACE","R.",""),("DABBAY","JOHN MICHAEL","R.",""),("DABELA","CELESTINO","N.",""),("DABELA","GLEN","T.",""),("DABELA","NERIE ","N.",""),("DABERTE","REGINALD","F.",""),("DABI","JOHN RAY","A.",""),("DABO","MARITES","G.",""),("DABO","SHERWIN","C.",""),("DABU ","BOGART","P.",""),("DABU ","CARLO ","L.","JR."),("DABU ","CARMELA ISABEL","G.",""),("DABU ","DARWIN ","A.",""),("DABU ","DENNIS ","H.",""),("DABU ","JAYMILL","D.",""),("DABU ","KAREEM","D.",""),("DABU ","KAYCEE","G.",""),("DABU ","KEVIN","D.",""),("DABU ","MICHELLE","D.",""),("DABU ","RAINIEL","M.",""),("DABU ","RENZO","M.",""),("DABU ","REY","B.",""),("DABUEL","JANREY","E.",""),("DABUET","EDGIE","P.",""),("DABUET ","MARIVIC","J.","")');
        // var_dump($this->db->insert_id());die;
        if($this->session->userdata("role") != "E") {
            echo json_encode(["status" => "error", "message" => "Unauthorized access is not allowed!!"]);
            die;
        }
        header("Content-Type: application/json; charset=UTF-8");
        
        // echo "<pre>";
        // var_dump($this->input->post()); die;
        $stud_id = trim($this->input->post("stud_id"));
        $stud_fname = trim($this->input->post("stud_fname"));
        $stud_lname = trim($this->input->post("stud_lname"));
        $stud_mname = trim($this->input->post("stud_mname"));
        $stud_sfx = trim($this->input->post("stud_sfx"));
        $shelf = trim($this->input->post("shelf"));

        /** Student Information checking */
        $required_fields = array();

        if(empty($stud_fname)) array_push($required_fields, "First Name");
        if(empty($stud_lname)) array_push($required_fields, "Last Name");
    
        $required_fields = implode(",", $required_fields);

        if(!empty(trim($required_fields))) {
            echo json_encode(array('status'=>'error', 'message'=>'Text Fields not complete', 'columns'=>$required_fields));
            exit;
        }  
        
        $invalid_fields = array();
        if(!empty($stud_id) && empty(trim($stud_id, "\\'`\""))) array_push($invalid_fields, "ID");
        if(empty(trim($stud_fname, " \t\n\r\0\x0B/\\'`\""))) array_push($invalid_fields, "First Name");
        if(empty(trim($stud_lname, " \t\n\r\0\x0B/\\'`\""))) array_push($invalid_fields, "Last Name");
        if(!empty($stud_mname) && empty(trim($stud_mname, "\\'`\""))) array_push($invalid_fields, "Middle Name");
        if(!empty($stud_sfx) && empty(trim($stud_sfx, "\\'`\""))) array_push($invalid_fields, "SFX");

        $invalid_fields = implode(",", $invalid_fields);

        if(!empty(trim($invalid_fields))) {
            echo json_encode(array('status'=>'error', 'message'=>'Value must contain characters', 'columns'=>$invalid_fields));
            exit;
        }  
        
        insert_slashes($stud_id);
        insert_slashes($stud_fname);
        insert_slashes($stud_lname);
        insert_slashes($stud_mname);
        insert_slashes($stud_sfx);

        $student_info = ["stud_id"=>$stud_id, "stud_fname"=>$stud_fname,"stud_lname"=>$stud_lname, "stud_mname"=>$stud_mname, "stud_sfx"=>$stud_sfx, "shelf" => $shelf];
        $student = $this->stud->get_Student_By($student_info);
        if($student) {
            echo json_encode(array('status'=>'error', 'message'=>'Record already exist'));
            exit; 
        }
        
        unset($student_info['shelf']); // remove shelf key in $student_info to 

        /** END Student Information checking */
        
        $data = "";

        /** Inserting data in `stud_rec` table */
        foreach($student_info as $key => $val) {
            if(!empty($val)){
                if(!empty($data)) $data .= ",";
                $data .= "`{$key}` = UPPER('{$val}')";
            }
        }

        $created_by_uid = $this->session->userdata('uid') ?? '1' ; //  user id for encoding
        
        $data .=  ", `created_by_uid` = '{$created_by_uid}'";

        $this->db->trans_begin();

        $student_id = $this->stud->add_student($data);
        /** -- End of inserting data in `stud_rec` table -- */
 
        $data = ""; // reset the data for the next query

        $stud_docs = [];

        // Get all keys that has `doc_val`
        $doc_keys = array_filter($this->input->post(), function($key){
            return str_contains($key, "doc_val_");
        }, ARRAY_FILTER_USE_KEY);

        // var_dump($doc_keys); die;
        /** Inserting data in `doc` table  */

        foreach($doc_keys as $key => $val) {
            if(str_contains($key, "doc_val")) {
                $doc = str_replace("doc_val_", "", $key);

                $stud_docs[$doc] =  "`$doc` = '{\"val\" : \"1\", \"dir\" :\"";
                
                // echo  $doc . PHP_EOL;
                // var_dump($_FILES['doc_scan_' . $doc]['name']) . PHP_EOL;
                if(isset($_FILES['doc_scan_' . $doc])) {
                    for($i = 0; $i < count($_FILES['doc_scan_' . $doc]['name']); $i++) {
                        if(!empty($_FILES["doc_scan_".$doc]['name'][$i]) && !empty($_FILES["doc_scan_".$doc]['tmp_name'][$i])) {
                            $stud_docs[$doc] .= trim($this->upload_file($_FILES["doc_scan_".$doc]['tmp_name'][$i], $_FILES["doc_scan_".$doc]['name'][$i], $_FILES["doc_scan_".$doc]['size'][$i]));
                            // echo($_FILES["doc_scan_".$doc]['tmp_name'][$i]); continue;
                            if($i < count($_FILES['doc_scan_' . $doc]['name']) - 1) $stud_docs[$doc] .= ","; 
                        }    
                    }
                }
                
                if(isset($stud_docs[$doc])) $stud_docs[$doc] .= "\"}'";
            }    
        }

        
        $data = count($stud_docs) > 0 ? implode(', ', array_values($stud_docs)) . "," : "";
        
        $shelfname = $this->input->post("shelf");
        $shelfid = $this->shelf->getShelfId($shelfname);
        
        $data .= "`stud_rec_id` = '{$student_id}', `shelf` = '{$shelfid}'";
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
            $this->db->trans_rollback();           
             echo json_encode(array(
                "status" => "error",
                "message" => $this->db->error()
            ));

            exit();
        }


    }

    /**
     * Get basic student record info along with their remarks
     */
    public function get_StudentRecords_With_Remarks() {
        $uid = $this->input->post("uid");
        $shelf = $this->input->post("shelf");

        $result = $this->stud->get_StudentRecords_With_Remarks($uid, " AND `sh`.name='{$shelf}'");
        // $nData = $this->to_Id_Link_Student_Record($result);
        // $nData = $this->count_remarks($nData);
        // $nData = $this->to_grouped_style($nData);
        echo to_JSON(['result' => $result]);
    }

    /**
     * Get specific student record info along with their remarks
     * @param Integer $id The `stud_rec`.`id`
     */
    public function get_Student_Records(int $id) {
        echo to_JSON(['result' => $this->stud->get_Student_all_Record($id)]);
    }

    /**
     * Get basic student record info along with their remarks added by `user`
     * @param Integer $user_id The `id` of user logged in
     */
    public function get_Student_Records_By(int $user_id) {
        $result = $this->stud->get_Student_Records_By($user_id);
        // $nData = $this->to_Id_Link_Student_Record($result);
        // $nData = $this->count_remarks($nData);
        // $nData = $this->to_grouped_style($nData);
        echo to_JSON(['result' => $result]);
    }

    /**
     * Get the last `stud_rec` inserted by `user`
     * @param Integer $user_id The `id` of user logged in
     */
    public function get_Last_Student_Records_By(int $user_id) {
        echo json_encode(['result' => $this->stud->get_Last_Record_By_User($user_id)]);  
    }

    /**
     * Update Student record
     */
    public function update_Student_Records() {

        if($this->session->userdata("role") != "E") {
            echo json_encode(["status" => "error", "message" => "Unauthorized access is not allowed!!"]);
            die;
        }
        
        header("Content-Type: application/json; charset=UTF-8");
        $stud_rec_id = intval($this->input->post("stud_rec_id"));

        $stud_id = trim($this->input->post("stud_id"));
        $stud_fname = trim($this->input->post("stud_fname"));
        $stud_lname = trim($this->input->post("stud_lname"));
        $stud_mname = trim($this->input->post("stud_mname"));
        $stud_sfx = trim($this->input->post("stud_sfx"));

        $required_fields = array();

        if(empty($stud_fname)) array_push($required_fields, "First Name");
        if(empty($stud_lname)) array_push($required_fields, "Last Name");
    
        $required_fields = implode(",", $required_fields);

        if(!empty(trim($required_fields))) {
            echo json_encode(array('status'=>'error', 'message'=>'Text Fields not complete', 'columns'=>$required_fields));
            exit;
        }  
        
        $invalid_fields = array();

        if(!empty($stud_id) && (empty(preg_replace("/[^A-Za-z0-9\"-\., ]/", "", $stud_id)))) array_push($invalid_fields, "ID");
        if(empty(preg_replace("/[^A-Za-z0-9\"-\.,]/", "", $stud_fname))) array_push($invalid_fields, "First Name");
        if(empty(preg_replace("/[^A-Za-z0-9\"-\.,]/", "", $stud_lname))) array_push($invalid_fields, "Last Name");
        if(!empty($stud_mname) && empty(preg_replace("/[^A-Za-z0-9\"-\., ]/", "", $stud_mname))) array_push($invalid_fields, "Middle Name");
        if(!empty($stud_sfx) && empty(preg_replace("/[^A-Za-z0-9\"-\., ]/", "", $stud_sfx))) array_push($invalid_fields, "SFX");

        $invalid_fields = implode(",", $invalid_fields);

        if(!empty(trim($invalid_fields))) {
            echo json_encode(array('status'=>'error', 'message'=>'Value must contain characters', 'columns'=>$invalid_fields));
            exit;
        }  
        
        insert_slashes($stud_id);
        insert_slashes($stud_fname);
        insert_slashes($stud_lname);
        insert_slashes($stud_mname);
        insert_slashes($stud_sfx);

        /** Update the `stud_rec` table */
        $stud_set = "";
        $student_info = ["stud_id" => $stud_id, "stud_fname" => $stud_fname, "stud_lname" => $stud_lname, "stud_mname" => $stud_mname, "stud_sfx" => $stud_sfx];

        foreach($student_info as $key => $val) {
            if(!empty($val)) {
                if(!empty($stud_set)) $stud_set .= ",";
                if($key == "stud_id") $stud_set .= "`$key` = '$val'";
                else $stud_set .= "`$key` = UPPER('$val')";
            }
        }

        $this->db->trans_begin();

        $this->stud->update_table('stud_rec', $stud_set, "WHERE `id` = $stud_rec_id");
        
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

        $this->stud->update_table('remarks', $remark_value, "WHERE `stud_rec_id` = $stud_rec_id");
        
        /** Update `doc` table  */
        $doc_set = ""; // sql statement
        $docs_set = []; // columns to be updated

        // Get all keys that has `doc_val_`
        $doc_keys = array_filter($this->input->post(), function($key){
            return str_contains($key, "doc_val_");
        }, ARRAY_FILTER_USE_KEY);

        foreach($doc_keys as $key=>$val) {
            if(str_contains($key, "doc_val")) {
                $doc = str_contains($key, "doc_val") ? str_replace("doc_val_", "", $key) : str_replace("doc_scan_", "", $key);
                
                if(intval($val) == 0) {
                    $docs_set[$doc] = "`$doc` = '{\"val\" : \"0\", \"dir\" : \"";   
                } else {
                    $docs_set[$doc] = "`$doc` = '{\"val\" : \"1\", \"dir\" : \"";
                }
                

                if(isset($_FILES['doc_scan_' . $doc])) {
                    for($i = 0; $i < count($_FILES['doc_scan_' . $doc]['name']); $i++) {
                        if(!empty(trim($_FILES['doc_scan_' . $doc]['name'][$i]))) {
                            $docs_set[$doc] .= trim($this->upload_file($_FILES['doc_scan_' . $doc]['tmp_name'][$i], $_FILES['doc_scan_' . $doc]['name'][$i], $_FILES['doc_scan_' . $doc]['size'][$i]));
                        }
                        if($i < count($_FILES['doc_scan_' . $doc]['name']) - 1) $docs_set[$doc] .= ","; 
                    }
                }

                $docs_set[$doc] .= "\"}'";

                $old_path = $this->get_doc_dir($stud_rec_id, $doc);
                
                if(!empty(trim($old_path))) { 
                    // echo $old_path . PHP_EOL;
                    /** convert the old_path to array */
                    $dirs = explode(",", $old_path);

                    /** delete each dir */
                    foreach($dirs as $dir) $this->delete_Image($dir); 
                }
            }
        }
        // var_dump($docs_set);
        // die;
       if(count($docs_set) > 0) {
            $doc_set =  implode(",", array_values($docs_set)) ;
            $this->stud->update_table('doc', $doc_set, "WHERE `stud_rec_id` = $stud_rec_id");
            /** End Update `doc` table  */
        }
        
        $this->stud->update_table('stud_rec'," `updated_date` ='". date('Y-m-d H:i:s')."', `updated_by_uid` = '".$this->session->userdata('uid')."'", " WHERE `id` = $stud_rec_id");
       

        

        if($this->db->trans_status() === TRUE) {
            $this->db->trans_commit();
            echo json_encode(array(
                "status" => "success"
            ));
        } else {
            $this->db->trans_rollback();
            echo json_encode(array(
                "status" => "error",
                "message" => $this->db->error()
            ));

            exit();
        }


    }

    public function delete_Student($stud_rec_id) {

        $result = $this->stud->delete_student($stud_rec_id);

        if($result) echo json_encode(['status' => 'success']);
        else echo json_encode(['status' => 'error', 'message' => $this->db->error()]);
    }

    public function filter_search() {
        $columns = [];
        $remarksColumns = [];

        foreach($this->input->post() as $k=>$val) {
            $nKey = preg_replace('/-/', '_', $k);
            if(strstr($k, "student")) {
                $nKey = preg_replace('/student/', 'stud', $nKey);
                $arr = explode("_", $nKey, 2);
                $colname = $arr[count($arr) - 1];
                array_push($columns, "`sr`.$colname LIKE '%{$val}%'");
            }

            if(strstr($k, "enocoder")) {
                $arr = explode("_", $nKey);
                $colname = $arr[count($arr) - 1];

                if($colname == "uname") array_push($columns, "(`u`.$colname LIKE '%{$val}%' OR `u2`.$colname LIKE '%{$val}%')");
                else if( $colname == "id") array_push($columns, "(`sr`.created_by_uid = '{$val}' OR `sr`.updated_by_uid = '{$val}')");
                else array_push($columns, "`ui`.$colname LIKE '%{$val}%'");
               
            }

            if(strstr($k, "remarks")) {
                $arr = explode("_", $nKey);
                $colname = $arr[count($arr) - 1];
                array_push($remarksColumns, "`rm`.value LIKE '%{$val}%'");
                
            }
        }

        $nColumns = count($columns) > 0 ?  implode(" AND \n", $columns) : null;
        $nRemarks = count($remarksColumns) > 0 ? implode(" OR \n", $remarksColumns) : null;

        $shelfid = $this->shelf->getShelfId($this->input->post('shelf'));
        if(!$shelfid) {echo json_encode(['result'=>["status" => "error", 'message' => "Error in searching..."]]); die; }

        $conditions = $nColumns . (!empty($nColumns) && !empty($nRemarks) ? ' AND ' : null) . $nRemarks . " AND `sh`.id = '{$shelfid}'";
        
        $result = $this->stud->filter_student($conditions);

        $student = $this->to_Id_Link_Student_Record($result['data']);
        $student = $this->to_grouped_style($student);
        $student = $this->count_remarks($student);

        echo json_encode(['result'=>$student, 'sql' => $result['sql']]);
    }


    public function get_all_stud_rec_as_select() {
        $uid = $this->input->post("uid");
        
        echo json_encode(["result"=> $this->stud->get_all_stud_rec_as_select()]);
    }

    public function trashBin() {
        $uid = $this->input->post("uid");
    
        $result = $this->stud->get_stud_rec_trashBin($uid);
        $nData = $this->to_Id_Link_Student_Record($result);
        $nData = $this->count_remarks($nData);
        $nData = $this->to_grouped_style($nData);
        echo json_encode(['result' => $nData]);

        // echo json_encode(["result"=> $this->stud->get_stud_rec_trashBin($uid)]); 
    }

    
    public function get_same_records_shelf() {
        extract($this->input->post());

        $student = ['stud_fname' => $stud_fname,
                    'stud_mname' => $stud_mname, 
                    'stud_lname' => $stud_lname];

        echo to_JSON($this->stud->get_same_records_shelf($student, $current_shelf));

    }

    public function quick_search() {
        $value = $this->input->post("value"); // search value


        $conditions = "
                        sr.stud_fname LIKE '%{$value}%' OR
                        sr.stud_lname LIKE '%{$value}%' OR 
                        sr.stud_mname LIKE '%{$value}%' OR 
                        sr.stud_id = '{$value}'
                    ";


        $student = $this->stud->filter_student($conditions);

        echo to_JSON($student);
    }
    public function student_record_merge($stud_rec_id) {
        
        $to = $this->input->post('to'); // shlef id to be merged

        $student = $this->stud->get_Student_all_Record($stud_rec_id); // record of the student to be merged

        $conditions = "
                        sr.stud_fname LIKE '%{$student['stud_fname']}%' AND
                        sr.stud_lname LIKE '%{$student['stud_lname']}%' AND
                        sr.id != {$stud_rec_id} AND 
                        `d`.shelf = {$to}
                    ";

        $other_columns = ", `d`.shelf, `d`.merged_shelves";

        $other_records = $this->stud->filter_student($conditions, $other_columns)['data']; // studetn records from other shelves

        $this->db->trans_begin();

        /******* update the other records to merged *******/
        foreach($other_records as $o) {
            
            $rec_id = (int)$o['Record ID'];
            $merged_shelves = to_ARRAY($o['merged_shelves']);

            array_push($merged_shelves, "{$student['shelf']}");

            $merged_shelves = to_JSON($merged_shelves);
            
            $data = "merged_shelves = '"  . $merged_shelves . "'";
            $conditions = " where stud_rec_id =  " . $rec_id;

            $this->stud->update_table('doc', $data, $conditions);

        }
        /***********************************************/

        $csMergedShleves = to_ARRAY($student['merged_shelves']);
        array_push($csMergedShleves, "{$to}");
        $csMergedShleves = to_JSON($csMergedShleves);
        $data = "merged_shelves = '"  . $csMergedShleves . "'";
        $conditions = " where stud_rec_id =  " . $stud_rec_id;
        $this->stud->update_table('doc', $data, $conditions);

        $this->db->trans_commit();

        echo to_JSON(['status' => 1, 'message' => 'Record merged.']);


    }

    public function get_Merged_Records() {
        extract($this->input->post());

        $student = $this->stud->get_Student_all_Record($stud_rec_id);

        $student['id'] = $stud_rec_id;
        
        echo to_JSON($this->stud->get_Merged_Records($student, $shelf));
    }

    /** PRIVATE FUNCTIONS */

    private function to_grouped_style(Array $stud_records){
        $nRecord = [];
        foreach ($stud_records as $row){
            $nRow = [];
            $lname = "";
            $fname = "";
            $mname = "";
            $sfx = "";      
            $cdate = "";    // created date
            $cby = "";      // created by
            $udate = "";    // updated date
            $uby = "";      // updated by
            $remarks = "";
            foreach($row as $key => $val){
                if($key === 'Record ID') $nRow[$key] = $val;
                if($key === "Last Name" && !empty($val) && $val !== "--") $lname = $val;
                if($key === "First Name" && !empty($val) && $val !== "--") $fname = $val;
                if($key === "Middle Name" && !empty($val) && $val !== "--") $mname = $val;
                if($key === "Suffix" && !empty($val) && $val !== "--") $sfx = $val;
                if($key === "cdate") {
                    $tempDate = intval(date_diff(new DateTime(), new DateTime($val))->format("%a"));
                    $cdate = ($tempDate == 0) ? "today" : (($tempDate == 1) ? "yesterday" : "{$tempDate} days ago") ;
                }
                if($key === "cby") $cby = $val;
                if($key === "udate") {
                    if($val == null) continue;
                    $tempDate = intval(date_diff(new DateTime(), new DateTime($val))->format("%a"));
                    $udate = ($tempDate == 0) ? "today" : (($tempDate == 1) ? "yesterday" : "{$tempDate} days ago") ;
                }
                if($key === "uby") $uby = $val;
                if($key === "Remarks") $remarks = $val;
            }
            $nRow['Student'] = 
                "<div class='fw-bold' style='white-space: nowrap;'>{$lname}, {$fname} {$mname} {$sfx}</div> 
                 <div style='font-size: small; margin-left: 10px;'>Created by <i>{$cby}</i> {$cdate}"
                 .(($uby == "") ? "" : ", updated by <i>{$uby}</i> {$udate}")." </div>";
            $nRow["Remarks"] = $remarks;
            array_push($nRecord, $nRow);
        }
        return $nRecord;
    }

    public function moveRecord($stud_record_id) {
        $shelf_id = trim($this->input->post("shelf"));
        $stud_record_id = trim(intval($stud_record_id));

        $doc_shelves_history = $this->stud->shelfHistory($stud_record_id)[0];
        $current_shelf = "'$doc_shelves_history->shelf'";


        $histories = trim(preg_replace('/[\[\]]/i', "", $doc_shelves_history->shelf_histories), " \n\r\t\v\0");
        $histories .= ',' . $current_shelf;
        $histories = "[" . $histories . "]";
        $histories = preg_replace('/\'/i', "\"", $histories);


        /** shelf movement */
        if($this->stud->moveShelf($stud_record_id, $shelf_id, $histories)) {
            echo json_encode(['status'=>'success', 'message' => 'Record has been moved successfully!']);
        }

    

        // echo $shelf_id . " " . $record_id;
    }


    /**
     * Change the `Record ID` column to a link in `stud_rec` table
     * @param Array $array query result 
     */
    private function to_Id_Link_Student_Record(Array $array) {
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
    private function upload_file($tmp, $name, $size) {
        echo $size;
        $path = str_replace('\\', '/', BASEPATH);
        $path = str_replace('system/', 'uploads/', $path);

        $f = file_get_contents($tmp);

        if(!is_dir($path)) mkdir($path,DIR_WRITE_MODE, true);

        $datetime = date("Y_m_d_H_i_s") . bin2hex(random_bytes(5));

        $file_name = $datetime . '.' . basename($name);

        return optimize_image($tmp, $path, $file_name, $size) ? "uploads/" . $file_name : '';
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
        $path = str_replace('\\', '/', BASEPATH);
        $path = str_replace('system/', $dir, $path);
        
        if(!empty($dir) && file_exists($path)) {
            return unlink($path);
        }
    }

    /**
     * Change `Remarks` column to hoverable panel
     * @param int $count number of remarks
     * @param String $value remarks values
     */
    private function to_Hoverable(int $count, String $value) {
        return "<div class='stud_rec-status stud_rec-".($count===0?"success":"danger")."' title='{$value}' style='cursor: context-menu; text-align: center;'>"
                .($count===0?"No Remarks":"{$count} Remarks")."</div>";
    }

    /**
     * Count the remarks of the student 
     * @param Array $data
     */
    private function count_remarks(Array $data) {
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

    // Minove ko sa Helper ung insert_slashes na function
}
