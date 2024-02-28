<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function create(string $data){
        $sql = "
                insert into requests 
                set 
                {$data}
                ";
        
        $this->db->query($sql);

        return $this->db->affected_rows();
    }

    public function fetch_all($user) {
        if(!$user) return null;

        $sql = "
                select
                    req.* 
                from requests req
                ";
                
        $condition = " where req.deleted_flag = 0"; // het all the not deleted requests 

        if($user['role'] == "V") { // kapag hindi admin kukunin lang yung mga request na created ni Viewer
            $sql .= "
                    join 
                        user u
                    on 
                        req.created_by = u.id
                    ";
            $condition .= " u.id = {$user['uid']} AND ";
        }
        $sql .= $condition;
        $sql .= " order by req.priority, req.created_at DESC";
       
        return $this->db->query($sql)->result();
    }

    public function fetch($id) {
        $sql = "
                select * from requests
                where id = {$id}
                ";
        return $this->db->query($sql)->result();
    }

    public function update(string $items, string $condition) {
        $sql = "
                update requests 
                set 
                    {$items}
                where 
                    {$condition}
                ";
        $this->db->query($sql);

        return $this->db->affected_rows();
    }
}

?>