<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shelf_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }
    public function __destruct()
    {
        $this->db->close();
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
        /*
            COUNT(sr.id) AS total,
            COUNT(DISTINCT u.id) AS users,
            MAX(sr.created_date) AS last_date
        */
        $sql = "
        SELECT 
            sh_.id,
            sh_.name
        FROM shelves sh_
        WHERE 
                sh_.deleted_flag = 0
        GROUP BY sh_.id, sh_.name";

        $shelves_infos = array();

        $shelves = $this->db->query($sql)->result();
        foreach($shelves as $sh) {            
            $info_query = "select
                                '{$sh->id}' as id,
                                '{$sh->name}' as name,
                                COUNT(sr.id) AS total,
                                COUNT(DISTINCT u.id) AS users,
                                MAX(sr.created_date) AS last_date
                            from 
                                stud_rec sr
                            left join 
                                doc d
                            on sr.id = d.stud_rec_id
                            left join 
                                shelves sh
                            on d.shelf = sh.id
                            LEFT JOIN user u ON u.id = sr.created_by_uid
                            LEFT JOIN user u2 ON u2.id = sr.updated_by_uid
                            where sh.name = '{$sh->name}' and sr.deleted_flag = 0 and sr.is_merged = 0";
            $info_result = $this->db->query($info_query)->result();
            array_push($shelves_infos, ...$info_result);
        }
        

        $this->db->close();
        return $shelves_infos;
    }

    public function getAllNames() {
        return $this->db->query("SELECT `id`, `name` FROM `shelves`")->result_array();
    }

    public function archives() {
        $query = "SELECT id, name, deleted_flag FROM shelves where deleted_flag = 1";

        $fetch = $this->db->query($query);
        return $fetch->result();

    }
}
?>