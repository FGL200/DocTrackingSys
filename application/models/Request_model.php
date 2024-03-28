<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Request_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }
    public function __destruct()
    {
        $this->db->close();
    }

    public function create(string $data){
        $sql = "
                insert into requests 
                set 
                {$data}
                ";
        
        $this->db->query($sql);
        $last_id = $this->db->insert_id();
        add_To_User_Logs($this, $this->session->userdata("uid"), "({$this->session->userdata("uid")}) Created new Request.", trim($sql));
        return $last_id;
    }

    public function fetch_all($user) {
        if(!$user) return null;

        $sql = '
                    SELECT 
                    r.id as ID,
                    concat(r.lname, \', \', r.fname, \', \', r.mname) as Requestor,
                    r.created_at as \'Requested Date\',
                    IFNULL(concat("[", group_concat(concat("{\"Name\" : \"", frc.name,"\", \"ID\" : \"", req_f.id,"\",\"Status\" : ",req_f.status,"}")), "]"), \'[]\') \'Requested File\',
                    r.due_date as \'Due Date\',
                    r.priority
                FROM 
                    requests r
                left join 
                    requested_files req_f
                on 
                    r.id = req_f.request_id
                left join 
                    file_request_categories frc 
                on 
                    req_f.file_id = frc.id
                ';

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
        $sql .= " GROUP BY r.id ORDER BY FIELD(r.priority, '1', '0'), r.due_date ASC";

        // echo $sql;
        return $this->db->query($sql)->result();
    }

    public function fetch(String $condition, String $join = "", String $otherCols = "") {
        $sql = '
                select
                    r.id as ID,
                    concat(r.lname, \', \', r.fname, \', \', r.mname) as Requestor,
                    r.created_at as \'Requested Date\',
                    IFNULL(concat("[", group_concat(concat("{\"Name\" : \"", frc.name,"\", \"Frc_ID\" : \"", frc.id,"\", \"ID\" : \"", req_f.id,"\",\"Status\" : ",req_f.status,"}")), "]"), \'[]\') \'Requested File\',
                    r.due_date as \'Due Date\'
                    '.$otherCols.'
                FROM 
                    requests r
                left join 
                    requested_files req_f
                on 
                    r.id = req_f.request_id
                left join 
                    file_request_categories frc 
                on 
                    req_f.file_id = frc.id
                '.$join.'
                '.$condition.'
                GROUP BY r.id ORDER BY FIELD(r.priority, "1", "0"), r.due_date ASC
                ';
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
                    MONTHNAME(Date) as month
                from requested_files
                where 
                    (locate('Not Released', status) or 
                    locate('Released', status)) AND 
                    (MONTH(Date) = MONTH('{$curr_date}') AND 
                    YEAR(Date) = YEAR('{$curr_date}'))
                group by
                    value, MONTH(Date), YEAR(Date)";
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
                    MONTHNAME(Date) as month
                from 
                    requested_files
                where 
                    (locate('Not Released', status) or 
                    locate('Released', status)) AND 
                    (MONTH(Date) = MONTH('{$curr_date}') - 1 AND 
                            YEAR(Date) = YEAR('{$curr_date}'))
                group by
                    value, 
                    MONTH(Date), 
                    YEAR(Date)";
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
                    `requested_files` 
                WHERE 
                    (locate('Not Released', status) or 
                    locate('Released', status)) AND 
                    YEAR(Date) = YEAR('{$curr_date}')
                group by
                    value, 
                    YEAR(Date)";
        
        $fetch = $this->db->query($query);

        return $fetch->result();
    }

    public function archives() {
            $query = 'SELECT 
                        r.id as ID,
                        concat(r.lname, \', \', r.fname, \', \', r.mname) as Requestor,
                        r.created_at as \'Requested Date\',
                        IFNULL(concat("[", group_concat(concat("{\"Name\" : \"", frc.name,"\", \"ID\" : \"", req_f.id,"\",\"Status\" : ",req_f.status,"}")), "]"), \'[]\') \'Requested File\',
                        r.due_date as \'Due Date\'
                    FROM 
                        requests r
                    left join 
                        requested_files req_f
                    on 
                        r.id = req_f.request_id
                    left join 
                        file_request_categories frc 
                    on 
                        req_f.file_id = frc.id
                  where 
                    r.deleted_flag = 1
                group by r.id';

        $fetch = $this->db->query($query);
        return $fetch->result();
    }


    public function requestsReport(String $from, String $to, String $status) {

        /*
            when locate('\"Pending\"', status) then 'Pending'
                        when locate('\"Released\"', status) then 'Released' 
                        when locate('\"Not Released\"', status) then 'Not Released'
                    end as _status,


            CONDITION
            
            AND ({$status}

            group by _status    
         */
        $query = "select 
                    count(*) as total
                  from 
                    requests 
                  where (created_at between '{$from}' and '{$to}')
                  
                    ";

        // echo $query; return;
        return $this->db->query($query)->result();
    }

    public function per_requested_file($condition) {
        $query ="SELECT 
                frc.name as file,
                case 
                    when locate('\"Released\"', rf.status) then 'Released' 
                    when locate('\"Not Released\"', rf.status) then 'Not Released'
                    when locate('\"Pending\"', rf.status) then 'Pending'  
                end 
                as status
            FROM 
                `requested_files` rf
            JOIN 
                file_request_categories frc
            on find_in_set(frc.id, rf.file_id)
            {$condition}";

        $result = $this->db->query($query)->result();
        
        $temp = array();

        foreach($result as $r) {
            if($r->status) {
                if(!isset($temp[$r->file])) $temp[$r->file] = ["Released" => 0, "Not Released" => 0, "Pending" => 0];

                if($r->status == "Released") $temp[$r->file]["Released"]++;
                else if($r->status == "Not Released") $temp[$r->file]["Not Released"]++;
                else if($r->status == "Pending") $temp[$r->file]["Pending"]++;
                
            }
        }
        return $temp;
    }

}

?>