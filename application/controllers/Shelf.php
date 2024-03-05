<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shelf extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("shelf_model", "shelf");
        disable_db_debugging($this);
    }

    public function add() {
        $shelfname = trim(addcslashes($this->input->post("name"), " \t\n\r\0\x0B\-\`\"\'")," \t\n\r\0\x0B\-\`\"\'\\/");
        $uid = $this->session->userdata("uid");
        
        if(empty($shelfname)) {echo json_encode(['status'=>'error', 'message' => 'Shelfname should not be empty.']); die;}

        if($this->shelf->isShelfExisted($shelfname)) {echo json_encode(['status'=>'error', 'message' => "Shelfname {$shelfname} is already existed."]); die;}
        
        $data = "`name` = '{$shelfname}', `created_by` = '{$uid}'";
        
        if($this->shelf->add($data)) echo json_encode(['status'=>'success', 'message'=>'New shelf created.']);
        else echo json_encode(['status'=>'error', 'message'=>$this->db->error()['message']]);
    }

    public function getAllNames() {
        echo json_encode($this->shelf->getAllNames());
    }

    public function getShelvesAndInfo() {
        echo to_JSON($this->shelf->getShelvesAndInfo());
    }

    public function delete($id) {
        extract($this->input->post());
        $curr_date = date('Y-m-d H:i:s');
        $cuid = $this->session->userdata("uid");

        $items = " updated_date = '{$curr_date}', updated_by = '{$cuid}', deleted_flag = 1";
        $condition = "id = '{$id}'";

        $response = ['status' => 0];
        try {
            $result = $this->shelf->delete($items, $condition);
            $result = $result ? 1 : 0;
            $err = $this->db->error();
            if($err['message']) throw new Error($err['message']);
            $response['status'] = 1;
        } catch (Error $e){
            $response['message'] = $e->getMessage();
        } finally {
            echo to_JSON($response);
        }
        
    }

    public function update($id) {
        extract($this->input->post());
        $curr_date = date('Y-m-d H:i:s');
        $cuid = $this->session->userdata("uid");

        addcslashes($name, " \t\n\r\0\x0B\-\`\"\'");

        $items = " name = '{$name}', updated_date = '{$curr_date}', updated_by = '{$cuid}'";
        $condition = "id = '{$id}'";
       
        $response = ['status' => 0];
        try {
            $result = $this->shelf->update($items, $condition);
            $result = $result ? 1 : 0;
            $err = $this->db->error();
            if($err['message']) throw new Error($err['message']);
            $response['status'] = 1;
        } catch (Error $e){
            $response['message'] = $e->getMessage();
        } finally {
            echo to_JSON($response);
        }
        
    }

}

?>