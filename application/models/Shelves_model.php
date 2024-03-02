<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shelves_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function addShelf($data) {
        $sql = "INSERT INTO `shelves` SET {$data}";
        $uid = $this->session->userdata('uid');
        add_To_User_Logs($this, $uid, "({$uid}) Added new Shelf.", $sql);
        return $this->db->query($sql);
    }

    public function updateShelf($items, $conditions) {
        $query = "update shelves set {$items} where {$conditions}";
        $uid = $this->session->userdata('uid');
        add_To_User_Logs($this, $uid, "({$uid}) Added new Shelf.", $query);
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
        $sql = '
        SELECT 
        `sh_`.`id`,
        `sh_`.name,
           CASE WHEN DATE(MAX(`sr`.`created_date`)) IS NULL THEN 0
        ELSE count(*) 
        END "total",
        (
            SELECT
            CASE
                WHEN count(*) <= 0 THEN "--"
                ELSE count(*)
            END 
            FROM (SELECT 	
                `sh`.`name`
            FROM `shelves` `sh`
            INNER JOIN `doc` `d`
                ON `d`.`shelf` = `sh`.`id`
            INNER JOIN `stud_rec` `sr`
                ON `sr`.`id` = `d`.`stud_rec_id`
            INNER JOIN `user` `u`
                ON `u`.`id` = `sr`.`created_by_uid`
            GROUP BY `sh`.`name`, `u`.id) as t1
            WHERE `name` = `sh_`.`name`
        ) as "users",
        DATE(MAX(`sr`.`created_date`)) "last date"
    FROM `shelves` `sh_`
    LEFT JOIN `doc` `d`
        ON `d`.`shelf` = `sh_`.`id`
    LEFT JOIN `stud_rec` `sr`
        ON `sr`.`id` = `d`.`stud_rec_id`
    LEFT JOIN `user` `u`
        ON `u`.`id` = `sr`.`created_by_uid`
    LEFT JOIN `user` `u2`
        ON `u2`.`id` = `sr`.`updated_by_uid`
    LEFT JOIN remarks rm 
        ON rm.stud_rec_id = sr.id
    WHERE `sr`.`deleted_flag` != "1" || `sr`.`deleted_flag` IS NULL
    GROUP BY `sh_`.`name`';

       

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function getAll() {
        return $this->db->query("SELECT `id`, `name` FROM `shelves`")->result_array();
    }
}
?>