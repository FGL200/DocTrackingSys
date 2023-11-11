<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller{

    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("User_model", "user");
    }

    /**
     * UPDATE USER INFO
     */
    public function update() {

        switch($this->session->userdata("role")) {
            case "E":
            case "V":
                if(!empty(trim($this->input->post("profile-old-pass"))) && empty(trim($this->input->post("profile-new-pass")))) {
                    echo json_encode(['status'=>'error', 'message'=>'New Password must not be empty']);
                    die;
                }
                if(empty(trim($this->input->post("profile-old-pass"))) && !empty(trim($this->input->post("profile-new-pass")))) {
                    echo json_encode(['status'=>'error', 'message'=>'Old Password must not be empty']);
                    die;
                }
        
                if(!empty(trim($this->input->post("profile-old-pass"))) && !empty(trim($this->input->post("profile-new-pass")))) {
                    $isMatch = $this->user->get_Old_Password($this->input->post("uid"), $this->input->post("profile-old-pass"));
                    
                    if(!$isMatch) { echo json_encode(['status' =>  "error", 'message' =>  "Password did not match."]); die; }
                }
                
                $data = "";
        
                foreach($this->input->post() as $key=>$val) {
                    
                    if(!empty(trim($val))) { 
                        // if(!empty($data) && $key != "profile-old-pass" && $key != "uid" && $key != "rid") $data .= ",";
                        // if($key == "profile-fname") $data .= " `ui`.`fname` = '".strtoupper($val)."' ";
                        // if($key == "profile-mname") $data .= " `ui`.`mname` = '".strtoupper($val)."' ";
                        // if($key == "profile-lname") $data .= " `ui`.`lname` = '".strtoupper($val)."' ";
                        // if($key == "profile-bday") $data .= " `ui`.`bday` = '".$val."' ";
                        // if($key == "profile-g") $data .= " `ui`.`gender` = '".strtoupper($val)."' ";
                        if($key == "profile-new-pass") $data .= " `u`.`pword` = PASSWORD('".$val."') ";
                    }
                    
                }
                $data .= " WHERE `u`.`id` = '".$this->input->post("uid")."'";
        
                $result = $this->user->update_user_info($data);
        
                // if($result) $this->get_user($this->input->post("uid"));
                
        
                if($result)$this->get_user(); //FRED
                else echo json_encode(['status' =>  "error", 'message' =>  "Error in saving profile"]); die;
            break;

            case "A":
                if($this->input->post("action") == "reset-password") {
                    $uid = $this->input->post("uid");
                    $uname = $this->input->post("uname");

                    $data = "`u`.`pword` = PASSWORD('default')";
                    $data .= " WHERE `u`.`id` = '$uid' AND `u`.`uname` = '$uname'";

                    // echo $data; die;
                    echo json_encode(["response" => $this->user->update_user($data)]);
                }

                if($this->input->post("action") == "set-active") {
                    $uid = $this->input->post("uid");
                    $uname = $this->input->post("uname");
                    $active = $this->input->post("active") ? "1" : "0";

                    $data = "`u`.`active` = '$active'";
                    $data .= " WHERE `u`.`id` = '$uid' AND `u`.`uname` = '$uname'";

                    echo json_encode(["response" => $this->user->update_user($data)]);
                }
            break;
        }
        
    }
    

    /**
     * NEW USER
     */
    public function new() {
        if($this->session->userdata("role") != "A") {
            echo json_encode(["status" => "error", "message" => "Unauthorized access is not allowed!!"]);
            die;
        }

        // initialize data to be passed
        $user_table_data = ""; $user_info_table_data = "";

        // get data from form
        $post = $this->input->post();

        // iterate each inuputs and save to data
        foreach($post as $key => $val){
            if(str_contains($key,'user-')){
                $key = str_replace("user-", "", $key); // remove the 'user-' in the key
                $user_table_data .= "`{$key}` = '".strtoupper($val)."',";
            }
            else {
                if(!empty($user_info_table_data)) $user_info_table_data .= ",";
                $user_info_table_data .= "`{$key}` = '".strtoupper($val)."'";
            }
            
        }
        
        $user_table_data .= "`pword` = PASSWORD('default')";

        // -- begin transaction --
        $this->db->trans_begin();

        // insert to `user` table
        $id = $this->user->insert_user($user_table_data);

        // concatenate the `user_id` to $user_info_table_data for reference
        $user_info_table_data .= ",`user_id`='$id'";
        
        // insert to `user_info` table
        $id = $this->user->insert_user_info($user_info_table_data);

        
        // -- end of transaction --
        if($this->db->trans_status() === TRUE) {
            $this->db->trans_commit();
            echo json_encode(["status" => "success"]);
        } else {
            $this->db->trans_rollback()();
            echo json_encode(["status" => "error"]);
        }
    }

    public function get_All_Viewers(){
        $my_user_id = $this->input->post()['uid'];
        // echo json_encode(['result' => $this->user->get_All_Viewers($my_user_id)]);  
        $nData = $this->__change_User_To_Proper_Format_($this->user->get_All_Viewers($my_user_id));
        echo json_encode(['result' => $nData]); 
    }

    public function get_All_Encoders(){
        $my_user_id = $this->input->post()['uid'];
        // echo json_encode(['result' => $this->user->get_All_Encoders($my_user_id)]);  
        $nData = $this->__change_User_To_Proper_Format_($this->user->get_All_Encoders($my_user_id));
        echo json_encode(['result' => $nData]); 
    }

    public function get_All_Users(){
        $my_user_id = $this->input->post()['uid'];
        $nData = $this->__change_User_To_Proper_Format_($this->user->get_All_Users($my_user_id));
        echo json_encode(['result' => $nData]);  
    }

    public function get_user() {
        // user id na ife-fetch 
        $uid = $this->input->post()['uid']; 

        // requester ng user id (dapat admin) if hindi admin, dapat pareho ang requester at ung nirerequest na ID
        $rid = $this->input->post()['rid']; 

        $nData = $this->user->get_user($rid, $uid);
        echo json_encode(['result' => $nData]);  
    }

    public function total_Encoded_By_Users() {
        $result = $this->user->get_Total_Encoded_By_Users();

        echo json_encode($result);
    }

    public function monthly_Encoded_By_Users() {
        $result = $this->user->get_Monthly_Encoded_By_Users();
        // echo "fdsfsdf";
        echo json_encode($result);
    }
    // PRIVATE FUNCTIONS 

    private function __change_User_To_Proper_Format_(Array $data) {
        $fixedData = [];
        foreach($data as $row){
            $nRow = $row;
            foreach($row as $key => $val){
                if($key === "Role"){
                    switch($val){
                        case "V" : $nRow["Role"] = "Viewer"; break;
                        case "E" : $nRow["Role"] = "Encoder"; break;
                        case "A" : $nRow["Role"] = "Admin"; break;
                        default : break;
                    }
                }
                if($key === "Status"){
                    switch(intval($val)){
                        case 1 : $nRow["Status"] = "<span class='user-status user-active'> Active </span>"; break;
                        case 0 : $nRow["Status"] = "<span class='user-status user-inactive'> Inactive </span>"; break;
                        default : break;
                    }
                }
                if($key === "User ID"){
                    $id = str_pad($nRow["User ID"], 6, "0", STR_PAD_LEFT);
                    // $nRow["<input type='checkbox' id='cb-select-all-user'/> User ID"] = "<input type='checkbox' class='cb-select-user' /> <a href='#' class='user_id_link'>{$id}</a>";
                    $nRow["User ID"] = "<a href='#' class='user_id_link' onclick='viewUser(".intval($id).")'>{$id}</a>";    
                }
            }
            array_push($fixedData, $nRow);
        }
        return $fixedData;
    }


}