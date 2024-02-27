<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        $this->load->model('Request_model', 'request_model');
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
        $user = $this->session->has_userdata('role') ? $this->session->userdata() : ['role' => 'V', 'uid' => 20];
    
        $requests = $this->request_model->fetch_all($user);

        echo to_JSON($requests);
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

            foreach($this->input->post() as $key => $val) {
                if(strlen($items) > 0) $items .= ",";
    
                insert_slashes($val);
    
                $items .= "`{$key}` = '$val'";
            }
    
            $condition = "`id` = {$id} and deleted_flag = 0";
    
    
            $affected_rows = $this->request_model->update($items, $condition);
            $response["status"] = $affected_rows > 0 ? "success" : "error"; 
        } catch (Exception $e) {
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
