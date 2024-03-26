<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RequestedFile extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Requestedfile_model', 'reqfile_model');   
    }

    public function updateFile() {
        try {
            $this->db->trans_start();
            $items = "";
            foreach($this->input->post() as $key => $val) {
                if($key == "reason" || $key == "id") continue;
    
                if(strlen($items)) $items .= ",";
                if($key == 'status') {
                    
                    if($val == "Released") {
                        $val = to_JSON(['value' => 'Released']);
                    } else if($val == "Not Released") {
                        $val = to_JSON(['value' => 'Not Released', 'reason' => $_POST['reason']]); 
                    }
                }
                $items = "`{$key}` = '{$val}'";
            }
    
            $condition = " ID = {$_POST['id']}";
    
            $this->reqfile_model->update($items, $condition);
            
            if($this->db->error()['message']) throw new Exception($this->db->error()['message']);
            
            echo to_JSON(['status' => 1 ]);
            $this->db->trans_commit();
            
        } catch (Exception $e) {
            echo to_JSON(['status' => 0, 'message' => $e->getMessage()]);
            $this->db->trans_rollback();
        }
    }
}

?>