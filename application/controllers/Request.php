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

            $items .= ", `status` = '{\"value\":\"Pending\"}', `created_by` = {$current_user}";
            
            $affected_rows = $this->request_model->create($items);
            
            $response["status"] = $affected_rows > 0 ? "success" : "error";
    
        } catch (Exception $e) {
            $response['status'] = "error";
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
            $this->db->trans_begin();

            foreach($requests as $req) {
          
                if($req->due_date) {
                    if(date('Y-m-d') > $req->due_date) {
                        $item = "`status` = '{\"value\" : \"Not Released\", \"reason\":\"di nakuha\"}'";
                        $condition = "`id` = {$req->id}";

                        $this->request_model->update($item, $condition);

                        if($this->db->error()['message']) throw new Exception('Error');
                    }
                }
            }


            $this->db->trans_commit();

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
        $request = $this->request_model->fetch($id);

        echo to_JSON($request);
    }

    public function update(int $id) {
        $response = ['status' => ""];
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
    
            $condition = "`id` = {$id} and deleted_flag = 0";
    
    
            $affected_rows = $this->request_model->update($items, $condition);
            $response["status"] = $affected_rows > 0 ? "success" : "error"; 
        } catch (Error $e) {
            $response['status'] = "error";
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
}

?>
