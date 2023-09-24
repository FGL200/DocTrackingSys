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
        echo json_encode(['result' => $this->user->get_All_Viewers($my_user_id)]);  
    }

    public function get_All_Encoders(){
        $my_user_id = $this->input->post()['uid'];
        echo json_encode(['result' => $this->user->get_All_Encoders($my_user_id)]);  
    }

    public function get_All_Users(){
        $my_user_id = $this->input->post()['uid'];
        echo json_encode(['result' => $this->user->get_All_Users($my_user_id)]);  
    }


}