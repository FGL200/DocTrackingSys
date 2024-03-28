<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        $this->load->model('Request_model', 'request_model');
        $this->load->model('Requestedfile_model', 'reqfile_model');   

        disable_db_debugging($this);
    }

    /**
     * create request
     */
    public function create() {
        $response = ['status' => ""];
        $curr_date = date("Y-m-d H:i:s");

        try {
            $this->db->trans_start();
            $create_request_items = "";
            
            
            foreach($this->input->post() as $key => $val) {
                if($key == "file") continue;
                
                if(strlen($create_request_items) > 0) $create_request_items .= ",";
                
                insert_slashes($val);
                
                $create_request_items .= "`{$key}` = '$val'";
            }
            $current_user = $this->session->userdata('uid');
            
            $create_request_items .= ",`created_by` = {$current_user}, `created_at` = '{$curr_date}'";
            
            $new_req_id = $this->request_model->create($create_request_items);

            if($this->db->error()['message']) throw new Exception($this->db->error()['message']);
            
            $requested_files = explode(",", $_POST['file']);
            $status = to_JSON(['value' => 'Pending']);

            foreach($requested_files as $file) {
                $add_file_items = "`request_id` = '{$new_req_id}', `file_id` = '{$file}', `status` = '{$status}'";
                $this->reqfile_model->add($add_file_items) ? "TRUE" : "FALSE";            
            }

            if($this->db->error()['message']) throw new Exception($this->db->error()['message']);
            
            $response["status"] = 1 ;
            $this->db->trans_commit();
        } catch (Exception $e) {
            $response['status'] = 0;
            $response['message'] = $e->getMessage();
            $this->db->trans_rollback();
        } finally {
            echo to_JSON($response);
        }
        
    }

    /**
     * fetch all requests
     */
    public function fetch_all() {
        $user = $this->session->has_userdata('role') ? $this->session->userdata() : ['role' => 'A', 'uid' => 20];
    
        $requests = $this->request_model->fetch_all($user);
        try {
           

            $requests = $this->request_model->fetch_all($user);

            echo to_JSON($requests);
        } catch(Exception $e){
            $this->db->trans_rollback()();
            echo to_JSON(["error_messge" => $this->db->error()]);
        }
        
    }

    /**
     * fetch single request record
     * @param $id request id
     */
    public function fetch(int $id) {
        $request = $this->request_model->fetch("where r.id = '{$id}'", "", ",r.reason as Reason,r.priority as Priority");
        echo to_JSON($request);
    }

    public function recover($req_id) {
        try {
            extract($this->input->post());
            $this->db->trans_start();
            $this->request_model->update("deleted_flag = '0', updated_by = '{$uid}'", "id = '{$req_id}'");
            $this->db->trans_commit();

            if($this->db->error()['message']) throw new Exception($this->db->error()['message']);

            echo to_JSON(['status' => 1]);

        } catch (Exception $e){
            $this->db->trans_rollback();
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
        }   
    }

    public function update(int $id) {
        $response = ['status' => "", 'message' => ''];
        try {
            $items = "";

            foreach($this->input->post() as $key => $val) {
                if(strlen($items) > 0) $items .= ",";
                if($key)
                insert_slashes($val);
    
                $items .= "`{$key}` = '$val'";
            }

            $dateUpdated = date("Y-m-d H:i:s");

            $items .= ", updated_by = {$this->session->userdata('uid')},updated_at = '{$dateUpdated}' 
                      ";
    
            $condition = "`id` = {$id} and deleted_flag = 0";
        
            $affected_rows = $this->request_model->update($items, $condition);
            $response["status"] = !$this->db->error()['message'] ? 1 : 0; 
            $response['message'] = $this->db->error()['message'];
        } catch (Error $e) {
            $response['status'] = 0;
            $response['message'] = $e->getMessage();
        } finally {
            echo to_JSON($response);
        }
        
    }

    public function delete($id) {
        $response = ['status' => ""];
        try {
            $items = "`deleted_flag` = 1";
            $condition = "id = {$id} and deleted_flag = 0";

            $affected_rows = $this->request_model->update($items, $condition);

            $response["status"] = $affected_rows > 0 ? "success" : "error";
        } catch (Exception $e) {
            $response['status'] = "error";
            $response['message'] = $e->getMessage();
        } finally {
            echo to_JSON($response);
        }
    }

    public function archives() {
        echo to_JSON($this->request_model->archives());
    }

    public function search() {
        $requestor_fname = $this->input->post('r_fname');
        $requestor_mname = $this->input->post('r_mname');
        $requestor_lname = $this->input->post('r_lname');

        $cfrom = $this->input->post('created_from');
        $cto = $this->input->post('created_to');

        $dfrom = $this->input->post('due_from');
        $dto = $this->input->post('due_to');

        $uid = $this->input->post('uid');

        $condition = "";
        $join = "";

        if(!empty($requestor_fname)) {
            if(!empty(trim($condition))) $condition .= " AND ";
            $condition .= "r.fname = '{$requestor_fname}'";
        }

        if(!empty($requestor_lname)) {
            if(!empty(trim($condition))) $condition .= " AND ";
            $condition .= "r.lname = '{$requestor_lname}'";
        }

        if(!empty($requestor_mname)) {
            if(!empty(trim($condition))) $condition .= " AND ";
            $condition .= "r.mname = '{$requestor_mname}'";
        }

        if(!empty($cfrom) && !empty($cto)) {
            if(strlen(trim($condition)) > 0) $condition .= " AND ";
            $condition .= "(r.created_at >= '{$cfrom}' and r.created_at <= '{$cto}')";
        }

        if(!empty($dfrom) && !empty($dto)) {
            if(strlen(trim($condition)) > 0) $condition .= " AND ";
            $condition .= "(r.due_date >= '{$dfrom}' and r.due_date <= '{$dto}')";
        }

        if(!user_Is_Admin($this, $uid)) {
            if(strlen(trim($condition)) > 0) $condition .= " AND ";
            $condition .= "r.created_by = '{$uid}'";
            $join .= "join 
                        user u
                    on 
                        r.created_by = u.id";
        }
        $condition .= (!empty(trim($condition)) ? "AND" : "") . " r.deleted_flag = 0";
        $condition = "WHERE " . $condition;

        echo to_JSON($this->request_model->fetch($condition));

    }
}

?>
