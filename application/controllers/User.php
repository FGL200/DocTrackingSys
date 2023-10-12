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
        /** Check if profile-old-pass OR profile-new-pass is not empty */
        if(!empty(trim($this->input->post("profile-old-pass"))) || !empty(trim($this->input->post("profile-new-pass")))) {

            /** Check if both passwords is same */
            if(trim($this->input->post("profile-old-pass")) != trim($this->input->post("profile-new-pass"))) {
                echo json_encode(['status'=>"error", "message" => "Password's not match"]);
                die;
            }
        }
        
        $data = "";

        foreach($this->input->post() as $key=>$val) {
            
            if(!empty(trim($val))) { 
                if(!empty($data) && $key != "profile-old-pass" && $key != "uid") $data .= ",";
                if($key == "profile-fname") $data .= " `ui`.`fname` = '".strtoupper($val)."' ";
                if($key == "profile-mname") $data .= " `ui`.`mname` = '".strtoupper($val)."' ";
                if($key == "profile-lname") $data .= " `ui`.`lname` = '".strtoupper($val)."' ";
                if($key == "profile-bday") $data .= " `ui`.`bday` = '".$val."' ";
                if($key == "profile-g") $data .= " `ui`.`gender` = '".strtoupper($val)."' ";
                if($key == "profile-new-pass") $data .= " `u`.`pword` = PASSWORD('".$val."') ";
            }
            
        }
        $data .= " WHERE `u`.`id` = '".$this->input->post("uid")."'";

        $result = $this->user->update_user_info($data);

        echo json_encode(['status' => ( $result == true ? 'success' : 'error'), 'is_update' => $result]);
        $this->session->set_userdata($this->user->get_User_Info($this->input->post("uid")));

    }
    

    /**
     * NEW USER
     */
    public function new() {
        // initialize data to be passed
        $data = "";

        // get data from form
        $post = $this->input->post();

        // iterate each inuputs and save to data
        foreach($post as $key => $val) $data .= "{$key}='".strtoupper($val)."',";
        $data .= "`pword` = PASSWORD('default')";

        // -- begin transaction --
        $this->db->trans_begin();

        // insert to `user` table
        $id = $this->user->insert_user($data);

        // reinitialize data to be passed
        $data = "`user_id`='$id'";
        
        // insert to `user_info` table
        $id = $this->user->insert_user_info($data);

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
        $uid = $this->input->post()['uid'];
        $nData = $this->user->get_user($uid);
        echo json_encode(['result' => $nData]);  
    }

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
                    $nRow["User ID"] = "<a href='#' class='user_id_link'>{$id}</a>";    
                }
            }
            array_push($fixedData, $nRow);
        }
        return $fixedData;
    }


}