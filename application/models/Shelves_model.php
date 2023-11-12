<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shelves_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function addShelf($data) {
        $sql = "INSERT INTO `shelves` SET {$data}";
        return $this->db->query($sql);
    }


    public function isShelfExisted($shelfname) {
        $sql = "SELECT * FROM `shelves` WHERE `name` = '{$shelfname}'";

        $query = $this->db->query($sql);
        return $query->result() ? TRUE : FALSE;
    }
}
?>