<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FileRequestCategory extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("filerequestcategory_model", "filereq_model");
        disable_db_debugging($this);
    }

    public function get(Int $id = null) {
        try {
            $conditons = "";
            if($id) $conditons .= "id = '{$id}' and ";
            $conditons .= "deleted_flag = 0";
            
            $result = $this->filereq_model->get($conditons);

            if($this->db->error()['code'] && $this->db->error()['message']) throw new Exception($this->db->error()['message']);

            echo to_JSON($result);

        } catch (Exception $e) {
            echo to_JSON(['message' => $e->getMessage()]);
        }
        
        
    }

    public function add() {
        $items = "";
        try {
            foreach($this->input->post() as $key => $val) {
                if(strlen($items) > 0) $items .= ",";
                if($key == "uid") $key = "created_by";
                $items .= "`{$key}` = '$val'";
            }
    
            $this->filereq_model->add($items, $this->input->post("uid"));
            if($this->db->error()['code'] && $this->db->error()['message']) throw new Exception($this->db->error()['message']);
            echo to_JSON(['status' => 1]);  
        } catch (Exception $e) {
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
        }
        
    }

    public function update(Int $id) {
        $items = "";
        $conditons = "";
        try {
            foreach($this->input->post() as $key => $val) {
                // if($key == "id" || $key == "ID") {
                //     $conditons .= "$key = '$val'";
                //     continue;
                // }
                if(strlen($items) > 0) $items .= ",";
                
                if($key == "uid") $key = "updated_by";
                $items .= "`{$key}` = '$val'";
            }
    
            $curr_date = date("Y-m-d H:i:s");
            $items .= ", `updated_at` = '{$curr_date}'";
            $conditons .= "id = '{$id}'";

            $this->filereq_model->update($items, $conditons, $this->input->post("uid"));

            if($this->db->error()['code'] && $this->db->error()['message']) throw new Exception($this->db->error()['message']);
            echo to_JSON(['status' => 1]);  
        } catch (Exception $e) {
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
        }
    }

    public function delete(Int $id) {
        $items = "";
        $conditons = "";
        try {
            $curr_date = date("Y-m-d H:i:s");
            $items .= "deleted_flag = 1, `updated_at` = '{$curr_date}',`updated_by` = '{$this->input->post("uid")}'";
            $conditons .= "id = '{$id}'";
            $this->filereq_model->update($items, $conditons, $this->input->post("uid"));
            
            if($this->db->error()['code'] && $this->db->error()['message']) throw new Exception($this->db->error()['message']);
            
            echo to_JSON(['status' => 1]);  
        } catch (Exception $e) {
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
        }
    }

    public function archives() {
    echo to_JSON($this->filereq_model->archives());
    }
}

?>