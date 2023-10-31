<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
class Student extends CI_Controller{

    private $student_docs = array('regi_form', 'good_moral', 'j_f137','s_f137', 'f138', 'birth_cert', 'tor', 'app_grad', 'cert_of_complete', 'req_clearance_form', 'req_credentials', 'hd_or_cert_of_trans');
    
    public function __construct()
    {
        
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("student_model", "stud");
        $this->load->model("remarks_model", "rm");
        $this->load->model("user_model", 'user');

        /** File uploder helper */
        $this->load->helper(array("form", "url"));

    }

    /**
     * Add student record
     */
    public function  addRecord() {
        // echo "<pre>";
        // var_dump($this->input->post()); die;
        $stud_id = $this->input->post("stud_id");
        $stud_fname = $this->input->post("stud_fname");
        $stud_lname = $this->input->post("stud_lname");
        $stud_mname = $this->input->post("stud_mname");
        $stud_sfx = $this->input->post("stud_sfx");

        /** Student Information checking */
        $required_fields = array();

        if(empty(trim($stud_fname))) array_push($required_fields, "First Name");
        if(empty(trim($stud_lname))) array_push($required_fields, "Last Name");
    
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
        
        $this->insert_slashes($stud_id);
        $this->insert_slashes($stud_fname);
        $this->insert_slashes($stud_lname);
        $this->insert_slashes($stud_mname);
        $this->insert_slashes($stud_sfx);

        $student_info = ["stud_id"=>$stud_id, "stud_fname"=>$stud_fname,"stud_lname"=>$stud_lname, "stud_mname"=>$stud_mname, "stud_sfx"=>$stud_sfx];
        $student = $this->stud->get_Student_By($student_info);
        if($student) {
            echo json_encode(array('status'=>'error', 'message'=>'Record already exist'));
            exit; 
        }
        
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

        $input_docs = ["doc_val_regi_form","doc_val_good_moral","doc_val_j_f137","doc_val_s_f137","doc_val_f138","doc_val_birth_cert","doc_val_tor","doc_val_app_grad","doc_val_cert_of_complete", "doc_val_req_clearance_form","doc_val_req_credentials","doc_val_hd_or_cert_of_trans"];

        $stud_docs = [];
        /** Inserting data in `doc` table  */

        foreach($input_docs as $input_doc) {
            if(!empty($this->input->post($input_doc))) {
                $doc = str_replace("doc_val_", "", $input_doc);

                $stud_docs[$doc] =  "`$doc` = '{\"val\" : \"1\", \"dir\" :\"";

                for($i = 0; $i < count($_FILES['doc_scan_' . $doc]['name']); $i++) {
                    $stud_docs[$doc] .= trim($this->upload_file($_FILES["doc_scan_".$doc]['tmp_name'][$i], $_FILES["doc_scan_".$doc]['name'][$i]));
    
                    if($i < count($_FILES['doc_scan_' . $doc]['name']) - 1) $stud_docs[$doc] .= ","; 
                }
                
    
                if(isset($stud_docs[$doc])) $stud_docs[$doc] .= "\"}'";

            }
        }

        
        // foreach($_FILES as $key => $val) {
        //     $doc = str_replace("doc_scan_","", $key);
            
        //     $stud_docs[$doc] =  "`$doc` = '{\"val\" : \"1\", \"dir\" :\"";
                
        //     for($i = 0; $i < count($_FILES['doc_scan_' . $doc]['name']); $i++) {
        //         $stud_docs[$doc] .= trim($this->upload_file($_FILES["doc_scan_".$doc]['tmp_name'][$i], $_FILES["doc_scan_".$doc]['name'][$i]));

        //         if($i < count($_FILES['doc_scan_' . $doc]['name']) - 1) $stud_docs[$doc] .= ","; 
        //     }
            

        //     if(isset($stud_docs[$doc])) $stud_docs[$doc] .= "\"}'";
        // }
       

        
        $data = count($stud_docs) > 0 ? implode(', ', array_values($stud_docs)) . "," : "";

        $data .= "`stud_rec_id` = '{$student_id}'";
    
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
        $result = $this->stud->get_StudentRecords_With_Remarks();
        $nData = $this->to_Id_Link_Student_Record($result);
        $nData = $this->count_remarks($nData);
        $nData = $this->to_grouped_style($nData);
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
        $nData = $this->to_Id_Link_Student_Record($result);
        $nData = $this->count_remarks($nData);
        $nData = $this->to_grouped_style($nData);
        echo json_encode(['result' => $nData]);
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
        $stud_rec_id = intval($this->input->post("stud_rec_id"));

        $stud_id = $this->input->post("stud_id");
        $stud_fname = $this->input->post("stud_fname");
        $stud_lname = $this->input->post("stud_lname");
        $stud_mname = $this->input->post("stud_mname");
        $stud_sfx = $this->input->post("stud_sfx");

        $required_fields = array();

        if(empty(trim($stud_fname))) array_push($required_fields, "First Name");
        if(empty(trim($stud_lname))) array_push($required_fields, "Last Name");
    
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
        
        $this->insert_slashes($stud_id);
        $this->insert_slashes($stud_fname);
        $this->insert_slashes($stud_lname);
        $this->insert_slashes($stud_mname);
        $this->insert_slashes($stud_sfx);

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
        
        foreach($this->user_docs as $doc) {

            if($this->input->post("doc_val_" . $doc)) $docs_set[$doc] = "`$doc` = '{\"val\" : \"1\", \"dir\" : \"";
            else { 
                $docs_set[$doc] = "`$doc` = '{\"val\" : \"0\", \"dir\" : \"\"}'";
                continue;
            }

            if($this->input->post("doc_scan_" . $doc)) $docs_set[$doc] .= $this->input->post("doc_scan_" . $doc)."\"}'";

            if(isset($_FILES['doc_scan_' . $doc])) {

                for($i = 0; $i < count($_FILES['doc_scan_' . $doc]['name']); $i++) {
                    if(!empty(trim($_FILES['doc_scan_' . $doc]['name'][$i]))) {
                        $docs_set[$doc] .= trim($this->upload_file($_FILES['doc_scan_' . $doc]['tmp_name'][$i], $_FILES['doc_scan_' . $doc]['name'][$i]));
                    }
                    if($i < count($_FILES['doc_scan_' . $doc]['name']) - 1) $docs_set[$doc] .= ","; 
                    
                }
                $docs_set[$doc] .= "\"}'";
            }
            

            $old_path = $this->get_doc_dir($stud_rec_id, $doc);
            if($old_path) { 
                /** convert the old_path to array */
                $dirs = explode(",", $old_path);

                /** delete each dir */
                foreach($dirs as $dir) $this->delete_Image($dir); 
            }
            
        }
       
        $doc_set = count($docs_set) > 0 ? implode(",", array_values($docs_set)) : "";
        
        $this->stud->update_table('doc', $doc_set, "WHERE `stud_rec_id` = $stud_rec_id");
        $this->stud->update_table('stud_rec'," `updated_date` ='". date('Y-m-d H:i:s')."', `updated_by_uid` = '".$this->session->userdata('uid')."'", " WHERE `id` = $stud_rec_id");
        /** End Update `doc` table  */


        if($this->db->trans_status() === TRUE) {
            $this->db->trans_commit();
            echo json_encode(array(
                "status" => "success"
            ));
        } else {
            $this->db->trans_rollback()();
            echo json_encode(array(
                "status" => "error",
                "message" => $this->db->error()
            ));

            exit();
        }


    }

    public function delete_Student() {
        $stud_rec_id = $this->input->post("stud_rec_id");

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

            if(strstr($k, "profile")) {
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

        $conditions = $nColumns . (!empty($nColumns) && !empty($nRemarks) ? ' AND ' : null) . $nRemarks;
        
        $result = $this->stud->filter_student($conditions);

        $student = $this->to_Id_Link_Student_Record($result['data']);
        $student = $this->to_grouped_style($student);
        $student = $this->count_remarks($student);

        echo json_encode(['result'=>$student, 'sql' => $result['sql']]);
    }



    public function build_qr() {
        $path = str_replace('\\', '/', BASEPATH);
        
        if (!class_exists('chillerlan\QRCode\QRCode')) {
            $path = str_replace('system/', 'vendor/', $path);
            require $path . 'autoload.php';
        }
        $cond = null;
        $order = null;
        if($this->input->post("get") && $this->input->post("get") == "all") {
            
        }
        else if($this->input->post("from") && $this->input->post("to")) {
            $from = $this->input->post("from") ;
            $to = $this->input->post("to");

            $cond = " AND (LEFT(`sr`.stud_lname, ".strlen($from).") >= '$from' AND LEFT(`sr`.stud_lname, ".strlen($to).") <= '$to')";
            $order = "ORDER BY `Last Name` ASC";
        }

        $text = "";
        $qr_list = array();
        
        $data = $this->stud->get_StudentRecords_With_Remarks($cond, $order);
        
        $path = str_replace('vendor/', 'assets/', $path);
        foreach($data as $k => $v) {   
            $text = json_encode(['Record ID' => $v['Record ID'] ,'First Name' => $v['First Name'],'Last Name' => $v['Last Name'],'Middle Name' => $v['Middle Name']]);


            $result =Builder::create()
            ->writer(new PngWriter())
            ->writerOptions([])
            ->data($text)
            ->encoding(new Encoding('UTF-8'))
            ->errorCorrectionLevel(new ErrorCorrectionLevelHigh())
            ->size(300)
            ->margin(10)
            ->roundBlockSizeMode(new RoundBlockSizeModeMargin())
            ->logoPath($path . 'images/rtu-logo.png')
            ->logoResizeToWidth(100)
            ->logoPunchoutBackground(false)
            // ->labelText($v['First Name'] . " " . $v['Last Name'])
            ->validateResult(false)
            ->build();
        
        // Generate a data URI to include image data inline (i.e. inside an <img> tag)
            $dataUri = $result->getDataUri();
            array_push($qr_list, ["<img src='$dataUri'>", $text]);
            $text = "";
            
        }

        echo json_encode(["data" => $qr_list]);

    }

    public function get_all_stud_rec_as_select() {
        $uid = $this->input->post("uid");
        
        echo json_encode(["result"=> $this->stud->get_all_stud_rec_as_select()]);
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
    private function upload_file($tmp_name, $file_name) {
        $path = str_replace('\\', '/', BASEPATH);
        $path = str_replace('system/', 'uploads/', $path);

        $f = file_get_contents($tmp_name);

        if(!is_dir($path)) mkdir($path,DIR_WRITE_MODE, true);

        $new_file_name = date("Y_m_d_H_i_s") . bin2hex(random_bytes(5));

        $file_name = $new_file_name . '.' . basename($file_name);

        $new_file_path =  'uploads/' . $file_name;
        $data = $new_file_path;
        // echo $new_file_name;
        return move_uploaded_file($tmp_name, $new_file_path) ? $data : '';

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
                .($count===0?"No Remarks":$count." Remarks")."</div>";
    }

    /**
     * Count the remarks of the student 
     * @param Array $data
     * 
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

    /**
     * Insert slashes to the characters like ["/\'`]
     * @param Array $inputs
     */
    private function insert_slashes(& $input, $pattern = "\/\"'`") {
        $input = addcslashes($input, $pattern);
    }
}
