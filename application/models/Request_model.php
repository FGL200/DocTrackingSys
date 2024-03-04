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
        $cuid = $this->session->userdata('uid');
        add_To_User_Logs($this, $cuid, "({$cuid}) Created a Request.", trim($sql));
        return $this->db->affected_rows();
    }

    public function fetch_all($user) {
        if(!$user) return null;

        $sql = "
                select
                    req.* 
                from requests req
                ";

        $condition = " where req.deleted_flag = 0 "; // het all the not deleted requests 

        if($user['role'] == "V") { // kapag hindi admin kukunin lang yung mga request na created ni Viewer
            $sql .= "
                    join 
                        user u
                    on 
                        req.created_by = u.id
                    ";
            $condition .= " AND u.id = {$user['uid']}";
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
        $curr_Datetime = date("Y-m-d H:i:s"); 

        $items .=  ", `updated_at`  = '{$curr_Datetime}'";
        
        $sql = "
                update requests 
                set 
                    {$items}
                where 
                    {$condition}
                ";
        $this->db->query($sql);
        $cuid = $this->session->userdata('uid');
        add_To_User_Logs($this, $cuid, "({$cuid}) Updated a Request.", trim($sql));

        return $this->db->affected_rows();
    }


    public function get_Current_Month_Status() {
        $curr_date = date("Y-m-d");
        $query = "select 	
                    case 
                        when 
                            locate('Not Released', status)
                        then 
                            'not_released'
                        when 
                            locate('Released', status)
                        then 
                            'released'
                    end as value,
                    count(*) as total,
                    MONTHNAME(updated_at) as month
                from requests
                where 
                    (locate('Not Released', status) or 
                    locate('Released', status)) AND 
                    (MONTH(updated_at) = MONTH('{$curr_date}') AND 
                    YEAR(updated_at) = YEAR('{$curr_date}'))
                group by
                    value, MONTH(updated_at), YEAR(updated_at)";
        $fetch = $this->db->query($query);

        return $fetch->result();


    }

    public function get_Prev_Month_Status() {
        $curr_date = date("Y-m-d");
        $query = "
                select 	
                    case 
                        when 
                            locate('Not Released', status)
                        then 
                            'not_released'
                        when 
                            locate('Released', status)
                        then 
                            'released'
                    end as value,
                    count(*) as total,
                    MONTHNAME(updated_at) as month
                from 
                    requests
                where 
                    (locate('Not Released', status) or 
                    locate('Released', status)) AND 
                    (MONTH(updated_at) = MONTH('{$curr_date}') - 1 AND 
                            YEAR(updated_at) = YEAR('{$curr_date}'))
                group by
                    value, 
                    MONTH(updated_at), 
                    YEAR(updated_at)";
        $fetch = $this->db->query($query);

        return $fetch->result();
    }

    public function get_Current_Year_Status() {
        $curr_date = date("Y-m-d");
        $query = "SELECT 
                    case 
                        when 
                            locate('Not Released', status)
                        then 
                            'not_released'
                        when 
                            locate('Released', status)
                        then 
                            'released'
                        end as value,
                        count(*) as total
                FROM 
                    `requests` 
                WHERE 
                    (locate('Not Released', status) or 
                    locate('Released', status)) AND 
                    YEAR(created_at) = YEAR('{$curr_date}')
                group by
                    value, 
                    YEAR(updated_at)";
        
        $fetch = $this->db->query($query);

        return $fetch->result();
    }
}

?>