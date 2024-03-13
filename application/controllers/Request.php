<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        $this->load->model('Request_model', 'request_model');   

        disable_db_debugging($this);
    }

    /**
     * create request
     */
    public function create() {
        $response = ['status' => ""];
        try {
            $items = "";
            foreach($this->input->post() as $key => $val) {
                if(strlen($items) > 0) $items .= ",";
    
                insert_slashes($val);
    
                $items .= "`{$key}` = '$val'";
            }
            $current_user = $this->session->userdata('uid');

            $items .= ", `status` = '{\"value\" : \"Pending\"}', `created_by` = {$current_user}";
            
            $affected_rows = $this->request_model->create($items);
            
            $response["status"] = 1 ;
    
        } catch (Exception $e) {
            $response['status'] = 0;
            $response['message'] = $e->getMessage();
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
        $request = $this->request_model->fetch("where r.id = '{$id}'");
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
            
            if($this->input->post('status') && !in_array($this->input->post('status'), ['Released', 'Not Released', 'Pending']))
                throw new Error('Invalid status value.');

            if(in_array($this->input->post('status'), ["Released", "Pending"]) &&  $this->input->post('reason')) 
                throw new Error('Released and Pending request doesnt have reason.');

            if($this->input->post('status') && $this->input->post('reason')) {
                $_POST['status'] = "{\"value\" : \"{$this->input->post('status')}\", \"reason\" : \"{$this->input->post('reason')}\"}";
                unset($_POST['reason']);
            } else if($this->input->post('status') && !$this->input->post('reason')) {
                $_POST['status'] = "{\"value\" : \"{$this->input->post('status')}\"}";
            }

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

        $status = $this->input->post('status');

        $cfrom = $this->input->post('created_from');
        $cto = $this->input->post('created_to');

        $dfrom = $this->input->post('due_from');
        $dto = $this->input->post('due_to');

        $uid = $this->input->post('uid');

        $condition = "";
        $join = "";

        if(!empty($requestor_fname) || !empty($requestor_lname) || !empty($requestor_mname)) {
            $condition .= "(
                r.fname = '{$requestor_fname}' or 
                r.lname = '{$requestor_lname}' or 
                r.mname = '{$requestor_mname}'
            )";
        }

        if(!empty($status)) {
            if(strlen(trim($condition)) > 0) $condition .= " AND ";
            $condition .= "locate('\"{$status}\"', r.status)";
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

        $condition = "WHERE " . $condition;

        echo to_JSON($this->request_model->fetch($condition));

    }
}

?>
