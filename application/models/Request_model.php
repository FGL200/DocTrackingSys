<?php

use PhpParser\Node\Expr\Cast\String_;

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
                SELECT 
                    r.id as ID,
                    concat(r.lname, ', ', r.fname, ', ', r.mname) as Requestor,
                    r.created_at as 'Requested Date',
                    GROUP_CONCAT(frc.name) as Files,
                    r.status as Status,
                    r.due_date as 'Due Date'
                FROM 
                    requests r
                INNER JOIN 
                    file_request_categories frc ON find_in_set(frc.id, r.file)
                ";

        $condition = " where r.deleted_flag = 0 "; // het all the not deleted requests 

        if($user['role'] == "V") { // kapag hindi admin kukunin lang yung mga request na created ni Viewer
            $sql .= "
                    join 
                        user u
                    on 
                        r.created_by = u.id
                    ";
            $condition .= " AND u.id = {$user['uid']}";
        }
        $sql .= $condition;
        $sql .= " GROUP BY r.id order by r.priority, r.created_at DESC";
        return $this->db->query($sql)->result();
    }

    public function fetch(String $condition, String $join = "") {
        $sql = "
                select * from requests r
                {$join}
                {$condition}
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

    public function archives() {
        $query = "SELECT 
                    id, 
                    lname, 
                    fname,
                    mname,
                    file,
                    reason,
                    status,
                    due_date, 
                    deleted_flag 
                  FROM 
                    requests 
                  where 
                    deleted_flag = 1";

        $fetch = $this->db->query($query);
        return $fetch->result();
    }


    public function requestsReport(String $from, String $to, String $status) {

        $query = "select 
                    case 
                        when locate('Pending', status) then 'Pending'
                        when locate('Released', status) then 'Released' 
                        when locate('Not Released', status) then 'Not Released'
                    end as _status
                  from 
                    requests 
                  where (created_at between '{$from}' and '{$to}') AND ({$status}) 
                  group by _status
                    ";

        // echo $query; return;
        return $this->db->query($query)->result();
    }

}

?>