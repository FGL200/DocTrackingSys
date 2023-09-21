<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RemarkCategory_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function getCategories(){
        $query = "SELECT category FROM remark_categories";
        return ($this->db->query($query)->result_array());
    }
}