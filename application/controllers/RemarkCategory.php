<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RemarkCategory extends CI_Controller{
    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("RemarkCategory_model", "rcateg");
    }

    public function getCategories() {
        $allCateg = [];
        foreach($this->rcateg->getCategories() as $categ) 
            array_push($allCateg, $categ['category']);
        echo json_encode($allCateg);
    }
}