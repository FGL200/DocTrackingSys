<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Excel_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function addFile($data) {
        $sql = "INSERT INTO `x_file` SET {$data}";
        return  $this->db->query($sql) ? $this->db->insert_id() : null;
    }  
    
    public function isFileExisted($filename) {

        $sql = "SELECT * FROM `x_file` WHERE `name` = '{$filename}'";

        $query = $this->db->query($sql);
        return $query->result() ? TRUE : FALSE;
    }
}
