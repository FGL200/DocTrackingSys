<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RemarkCategory_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }
    public function __destruct()
    {
        $this->db->close();
    }

    public function getCategories(){
        $query = "SELECT UPPER(`category`) `category` FROM remark_categories ORDER BY `id` DESC";
        return ($this->db->query($query)->result_array());
    }
}