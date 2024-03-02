<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shelves extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("shelves_model", "shelves");
        disable_db_debugging($this);
    }

    public function add_Shelf() {
        $shelfname = trim(addcslashes($this->input->post("name"), " \t\n\r\0\x0B\-\`\"\'")," \t\n\r\0\x0B\-\`\"\'\\/");
        $uid = $this->session->userdata("uid");
        
        if(empty($shelfname)) {echo json_encode(['status'=>'error', 'message' => 'Shelfname should not be empty.']); die;}

        if($this->shelves->isShelfExisted($shelfname)) {echo json_encode(['status'=>'error', 'message' => "Shelfname {$shelfname} is already existed."]); die;}
        
        $data = "`name` = '{$shelfname}', `created_by` = '{$uid}'";
        
        if($this->shelves->addShelf($data)) echo json_encode(['status'=>'success', 'message'=>'New shelf created.']);
        else echo json_encode(['status'=>'error', 'message'=>$this->db->error()['message']]);
    }

    public function getAll() {
        echo json_encode($this->shelves->getAll());
    }

    public function update_Shelf($id) {
        extract($this->input->post());
        $curr_date = date('Y-m-d H:i:s');
        $cuid = $this->session->userdata("uid");

        addcslashes($name, " \t\n\r\0\x0B\-\`\"\'");

        $items = " name = '{$name}', updated_date = '{$curr_date}', updated_by = '{$cuid}'";
        $condition = "id = '{$id}'";
       
        $result = $this->shelves->updateShelf($items, $condition);
        $result = $result ? 1 : 0;
        $err = $this->db->error();
        if($err['message']) {
            echo to_JSON(['status' => 0, 'error_message' => $err['message']]);
            return;
        }
        echo to_JSON(['status' => $result]);
        
    }

}

?>