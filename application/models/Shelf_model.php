<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shelf_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function add($data) {
        $sql = "INSERT INTO `shelves` SET {$data}";
        $uid = $this->session->userdata('uid');
        add_To_User_Logs($this, $uid, "({$uid}) Added new Shelf.", $sql);
        return $this->db->query($sql);
    }

    public function update($items, $conditions) {
        $query = "update shelves set {$items} where {$conditions}";
        $uid = $this->session->userdata('uid');
        add_To_User_Logs($this, $uid, "({$uid}) Updated a Shelf.", $query);
        return $this->db->query($query);
    }

    public function delete($items, $conditions) {
        $query = "update shelves set {$items} where {$conditions}";
        $uid = $this->session->userdata('uid');
        add_To_User_Logs($this, $uid, "({$uid}) Deleted a Shelf.", $query);
        return $this->db->query($query);
    }


    public function isShelfExisted($shelfname) {
        $sql = "SELECT * FROM `shelves` WHERE `name` = '{$shelfname}'";

        $query = $this->db->query($sql);
        return $query->result() ? TRUE : FALSE;
    }

    public function getShelfId($shelf){
        $sql = "SELECT * FROM `shelves` WHERE name = '{$shelf}' LIMIT 1";

        $query = $this->db->query($sql);
        return $query->result_array() ? $query->result_array()[0]['id'] : FALSE;
    }

    public function getShelvesAndInfo() {
        $sql = "
        SELECT 
            sh_.id,
            sh_.name,
            COUNT(sr.id) AS total,
            COUNT(DISTINCT u.id) AS users,
            MAX(sr.created_date) AS last_date
        FROM shelves sh_
        LEFT JOIN doc d ON d.shelf = sh_.id
        LEFT JOIN stud_rec sr ON sr.id = d.stud_rec_id
        LEFT JOIN user u ON u.id = sr.created_by_uid
        LEFT JOIN user u2 ON u2.id = sr.updated_by_uid
        LEFT JOIN remarks rm ON rm.stud_rec_id = sr.id
        WHERE 
                (sr.deleted_flag != 1 OR 
                sr.deleted_flag IS NULL) AND 
                sh_.deleted_flag = 0
        GROUP BY sh_.id, sh_.name";

       

        $query = $this->db->query($sql);
        $this->db->close();
        return $query->result();
    }

    public function getAllNames() {
        return $this->db->query("SELECT `id`, `name` FROM `shelves`")->result_array();
    }
}
?>