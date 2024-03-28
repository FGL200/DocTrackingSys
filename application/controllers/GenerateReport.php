<?php

use PhpParser\Node\Expr\PostDec;

defined('BASEPATH') OR exit('No direct script access allowed');

class GenerateReport extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        $this->load->model('request_model', 'rm');
        $this->load->model('remarks_model', 'rmm');
        $this->load->model('remarkcategory_model', 'rcm');
    }

    public function requests() {
        $_from = $this->input->post('_from');
        $_to = $this->input->post('_to');
        // $_released = $this->input->post('released');
        // $_not_released = $this->input->post('not-released');
        // $_pending = $this->input->post('pending');

        $status = [];

        // if($_released == '1') array_push($status, ' locate(\'"Released"\', status)');
        // if($_not_released == '1') array_push($status, 'locate(\'"Not Released"\',status)');
        // if($_pending == '1') array_push($status, 'locate(\'"Pending"\', status)');

        $status = join(' OR ',$status);

        $result = $this->rm->requestsReport($_from, $_to, $status);
        
        // $reqStatus = [];

        // foreach($result as $r) array_push($reqStatus, $r->_status);
        
        // if(!in_array('Pending', $reqStatus) && $_pending == 1) array_push($result, ['_status' => 'Pending', 'total' => 0]);
        // if(!in_array('Released', $reqStatus) && $_released == 1) array_push($result, ['_status' => 'Released', 'total' => 0]);
        // if(!in_array('Not Released', $reqStatus) && $_not_released == 1) array_push($result, ['_status' => 'Not Released', 'total' => 0]);

        
        echo to_JSON($result);

    }

    public function per_requested_file() {
        $_from = $this->input->post('_from');
        $_to = $this->input->post('_to');
        if(!isset($_from) || empty($_from)) {
            echo to_JSON(['status' => 0, 'message' => '`_from` not found']);
            die;
        }
        if(!isset($_to) || empty($_to)) {
            echo to_JSON(['status' => 0, 'message' => '`_to` not found']);
            die;
        }

        $files = to_ARRAY($this->input->post('files'));

        $files = array_map(function($file){return "\"$file\""; }, $files);

        $files = join(',', $files);

        $files = '(' . $files . ')';

        $condition = "";

        if(!empty($files)) $condition .= " frc.name in " . $files;
        if(!empty($_from) && !empty($_to)) {
            if(strlen($condition) > 0) $condition .= " AND ";
            $condition .= " rf.Date BETWEEN '{$_from}' and '{$_to}'";
        }

        $condition = "WHERE " . $condition;
        $result = $this->rm->per_requested_file($condition);

        echo to_JSON($result);
        
    }

    public function per_remarks() {
        $remarks_report = ['OTHER REMARKS' => 0];
        $remarks_categories = $this->rcm->getCategories();

        $remarks_categories = array_map(function($arr){
            return ($arr['category']);
        }, $remarks_categories);

        foreach($remarks_categories as $rc) {
            $remarks_report[$rc] = 0;
        }

        $remarks = $this->rmm->getRemarks();

        foreach($remarks as $remark) {
            $val = json_decode($remark['value']);
            if($val) {
                foreach($val as $v) {
                    // echo $v . PHP_EOL;
                    if(in_array($v, $remarks_categories)) {
                        $remarks_report[$v] += 1;
                    } else {
                        $remarks_report['OTHER REMARKS'] += 1;
                    }
                }
            } else{
                if(in_array($val, $remarks_categories)) {
                    $remarks_report[$val] += 1;
                } else {
                    $remarks_report['OTHER REMARKS'] += 1;
                }
            }
            
        }

        echo to_JSON($remarks_report);
    }


    public function requests_graph() {
        $curr_month = [];
        $prev_month = [];
        $curr_year = [];

        foreach($this->rm->get_Current_Month_Status() as $row) {
            if(!isset($curr_month['month']))  $curr_month['month'] = $row->month;
            if(!isset($curr_month['released']) && $row->value == "released") $curr_month['released'] = $row->total;
            if(!isset($curr_month['not_released']) && $row->value == "not_released") $curr_month['not_released'] = $row->total;
        }
        
        foreach($this->rm->get_Prev_Month_Status() as $row) {
            if(!isset($prev_month['month']))  $prev_month['month'] = $row->month;
            if(!isset($prev_month['released']) && $row->value == "released") $prev_month['released'] = $row->total;
            if(!isset($prev_month['not_released']) && $row->value == "not_released") $prev_month['not_released'] = $row->total;
        }

        foreach($this->rm->get_Current_Year_Status() as $row) {
            if(!isset($curr_year['released']) && $row->value == "released") $curr_year['released'] = $row->total;
            if(!isset($curr_year['not_released']) && $row->value == "not_released") $curr_year['not_released'] = $row->total;
        }
        echo to_JSON([
                      'curr_month' => $curr_month, 
                      'prev_month' => $prev_month,
                      'yearly' => $curr_year
                    ]);
    }
}