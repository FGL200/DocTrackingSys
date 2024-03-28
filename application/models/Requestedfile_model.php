<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Requestedfile_model extends CI_Model {
    private $table = "requested_files";
    public function __construct()
    {
        parent::__construct();
    }
    public function __destruct()
    {
        $this->db->close();
    }
    public function add($data) {
        $query = "  
                    insert into 
                    {$this->table}
                    set 
                    {$data}
        ";
        $result = $this->db->query($query);
        
        return ;
    }

    public function update($data, $condition) {
        $query = "
                    update
                    {$this->table}
                    set
                    {$data}
                    where 
                    {$condition}
                ";
        return $this->db->query($query);
    }
}

?>