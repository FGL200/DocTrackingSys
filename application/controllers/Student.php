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
        if($this->session->userdata("role") != "E") {
            echo json_encode(["status" => "error", "message" => "Unauthorized access is not allowed!!"]);
            die;
        }
        header("Content-Type: application/json; charset=UTF-8");
        
        try {
            $this->db->trans_start();
    
            $stud_rec = (array)json_decode($this->input->post('stud_rec'));
            $stud_rec_data = "";
            $stud_rec_id = 0;
    
            $stud_rec['shelf'] = $this->input->post('shelf');

            $existedRecord = $this->stud->get_Student_By($stud_rec);

            if($existedRecord) throw new Exception('Record already exist.');

            unset($stud_rec['shelf']);

            foreach($stud_rec as $key => $val) {
                if(strlen($stud_rec_data) > 0) $stud_rec_data .= ",";
                $stud_rec_data .= "`{$key}`= UPPER('".trim($val)."')";
            }
            
            $stud_rec_data .= ", created_by_uid = '{$this->input->post('uid')}'";
            
            $stud_rec_id = (int)$this->stud->add_student($stud_rec_data);
    
    
            // get all checkbox inputs
            $cb = array_filter($this->input->post(), function($key){
                return str_contains($key, "-cb");
            }, ARRAY_FILTER_USE_KEY);
    
            $stud_docs = [];
            $stud_docs_data = '';
    
            foreach($cb as $key => $val) {
                $nKey = str_replace('-cb', '', $key);
                $fileKey = $nKey . '-file';
    
                $stud_docs[$nKey]['val'] = '1';
                $stud_docs[$nKey]['dir'] = [];
    
                if(isset($_FILES[$fileKey])) {
                    for($i = 0; $i < count($_FILES[$fileKey]['name']); $i++) {
                        $fileDir = $this->upload_file($_FILES[$fileKey]['tmp_name'][$i], $_FILES[$fileKey]['name'][$i], $_FILES[$fileKey]['size'][$i]);
                        array_push($stud_docs[$nKey]['dir'], $fileDir);
                    }
                }
    
            }
            $stud_docs_keys = array_keys($stud_docs);
            $count = 0;
    
            foreach($stud_docs as &$doc) {
                $doc['dir'] = join(',', $doc['dir']);
                if(strlen($stud_docs_data) > 0) $stud_docs_data .= ",";
                $stud_docs_data .= "`".$stud_docs_keys[$count]."` = '".to_JSON($doc)."'";
                $count++;
            }
            
            if(strlen($stud_docs_data) > 0) $stud_docs_data .= ",";
            
            $stud_docs_data .= "`stud_rec_id` = '{$stud_rec_id}', shelf = '{$this->shelf->getShelfId($this->input->post('shelf'))}'";
    
            $this->stud->addStudentDoc($stud_docs_data);
    
            $remarks = $this->input->post('remarks');
            $remarks_data = "`stud_rec_id` = '{$stud_rec_id}', `value` = '{$remarks}'";
            $this->rm->insertRemarks($remarks_data);
            
            if($this->db->error()['message']) throw new Exception($this->db->error()['message']);

            $this->db->trans_commit();
            echo to_JSON(['status' => 1]);

        } catch (Exception $e) {
            $this->db->trans_rollback();
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
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
    public function update_Student_Records($stud_rec_id) {

        if($this->session->userdata("role") != "E") {
            echo json_encode(["status" => "error", "message" => "Unauthorized access is not allowed!!"]);
            die;
        }
        
        header("Content-Type: application/json; charset=UTF-8");


        try {
            $this->db->trans_start();
            $currdate = date("Y-m-d H:i:s");

            $stud_rec = (array)json_decode($this->input->post('stud_rec'));
            $stud_rec_data = "";

            foreach($stud_rec as $key => $val) {
                if(strlen($stud_rec_data) > 0) $stud_rec_data .= ",";
                $stud_rec_data .= "`{$key}`= UPPER('".trim($val)."')";
            }

            $stud_rec_data .= " , updated_by_uid='{$this->input->post('uid')}', updated_date='{$currdate}'";

            if($this->input->post('stud_rec'))
                $this->stud->update_table('stud_rec', $stud_rec_data, "where id = '{$stud_rec_id}'");

            // get all checkbox inputs
            $cb = array_filter($_FILES, function($key){
                return str_contains($key, "-file");
            }, ARRAY_FILTER_USE_KEY);
    
            $stud_docs = [];
            $stud_docs_data = '';
    
            foreach($cb as $key => $val) {
                $nKey = str_replace('-file', '', $key);
                $fileKey = $nKey . '-file';
    
                $stud_docs[$nKey]['val'] = $this->input->post($nKey . '-cb') ? '1' : '0';
                $stud_docs[$nKey]['dir'] = [];
    
                if(isset($_FILES[$fileKey])) {
                    // var_dump($_FILES[$fileKey]);
                    for($i = 0; $i < count($_FILES[$fileKey]['name']); $i++) {
                        $fileDir = $this->upload_file($_FILES[$fileKey]['tmp_name'][$i], $_FILES[$fileKey]['name'][$i], $_FILES[$fileKey]['size'][$i]);
                        array_push($stud_docs[$nKey]['dir'], $fileDir);
                    }
                }

                $old_path = $this->get_doc_dir($stud_rec_id, $nKey);

                if(!empty(trim($old_path))) {
                    /** convert the old_path to array */
                    $dirs = explode(",", $old_path);

                    /** delete each dir */
                    foreach($dirs as $dir) $this->delete_Image($dir); 
                }
    
            }
    
            $stud_docs_keys = array_keys($stud_docs);
            $count = 0;
    
            foreach($stud_docs as &$doc) {
                $doc['dir'] = join(',', $doc['dir']);
                if(strlen($stud_docs_data) > 0) $stud_docs_data .= ",";
                $stud_docs_data .= "`".$stud_docs_keys[$count]."` = '".to_JSON($doc)."'";
                $count++;
            }
            
            if(strlen($stud_docs_data) > 0)
                $this->stud->update_table('doc',$stud_docs_data, "where stud_rec_id = '{$stud_rec_id}'");
    
            $remarks = $this->input->post('remarks');
            $remarks_data = "`value` = '{$remarks}'";

            if($this->input->post('remarks'))
                $this->stud->update_table('remarks',$remarks_data,"where stud_rec_id = '{$stud_rec_id}'");
            
            if($this->db->error()['message']) throw new Exception($this->db->error()['message']);

            $this->db->trans_commit();
            echo to_JSON(['status' => 1]);

        } catch (Exception $e) {
            $this->db->trans_rollback();
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
        }

        exit;

        /*****************************************************************/


    }

    public function recover($stud_rec_id) {
        $currdate = date("Y-m-d H:i:s");
        try {
            $this->db->trans_start();
            $this->stud->update_table('stud_rec', "deleted_flag = '0', updated_date = '{$currdate}', updated_by_uid = '{$this->input->post('uid')}'", "WHERE id = '{$stud_rec_id}'");
            $this->db->trans_commit();
            echo to_JSON(['status' => 1]);
        } catch (Exception $e) {
            $this->db->trans_rollback();
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
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

        $from = $this->input->post('from');
        $to = $this->input->post('to');

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

        $conditions = $nColumns . (!empty($nColumns) && !empty($nRemarks) ? ' AND ' : null) . ($nRemarks) . ((!empty($nColumns) ||!empty($nRemarks) ? ' AND ' : null) . " `sh`.id = '{$shelfid}'");
        
        if(!empty($from) and !empty($to)) 
            $conditions .= " AND  `sr`.created_date BETWEEN '{$from}' AND '{$to}'";

        $result = $this->stud->filter_student($conditions);

        echo json_encode(['result'=>$result['data'], 'sql' => $result['sql']]);
    }


    public function get_all_stud_rec_as_select() {
        $uid = $this->input->post("uid");
        
        echo json_encode(["result"=> $this->stud->get_all_stud_rec_as_select()]);
    }

    public function trashBin() {
        $uid = $this->input->post("uid");
    
        $result = $this->stud->get_stud_rec_trashBin($uid);
       
        echo json_encode(['result' => $result]);

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
        
        $to = $this->input->post('id'); // shlef id to be merged

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

            $student['shelf'] = to_ARRAY($student['shelf']);

            array_push($merged_shelves, "{$student['shelf']->ID}");
            

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
            echo json_encode(['status'=>1, 'message' => 'Record has been moved successfully!']);
        }
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
        $path = str_replace('\\', '/', BASEPATH);
        $path = str_replace('system/', 'uploads/', $path);

        // $f = file_get_contents($tmp);

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
