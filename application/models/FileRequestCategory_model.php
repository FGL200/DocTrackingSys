<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FileRequestCategory_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function get(String $conditions = "") {
        $query = "select * from file_request_categories";
        if($conditions) $query .= " where {$conditions}";

        $fetch = $this->db->query($query);
        return $fetch->result();
    }

    public function add(String $data, Int $uid) {
        $query = "INSERT INTO `file_request_categories` SET {$data}";
        add_To_User_Logs($this, $uid, "({$uid}) Added new File Category.", $query);
        return $this->db->query($query);
    }

    public function update(String $data, String $conditions, Int $uid) {
        $query = "
                update file_request_categories 
                set 
                    {$data}
                where 
                    {$conditions} ";

        add_To_User_Logs($this, $uid, "({$uid}) Updated File Category.", $query);
        return $this->db->query($query);
    }

    public function archives() {
        $query = "SELECT * FROM file_request_categories where deleted_flag = 1";
        return $this->db->query($query)->result();
    }
}

?>