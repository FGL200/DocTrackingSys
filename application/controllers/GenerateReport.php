<?php

use PhpParser\Node\Expr\PostDec;

defined('BASEPATH') OR exit('No direct script access allowed');

class GenerateReport extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        $this->load->model('request_model', 'rm');
    }

    public function requests() {
        $_from = $this->input->post('_from');
        $_to = $this->input->post('_to');
        $_released = $this->input->post('released');
        $_not_released = $this->input->post('not-released');
        $_pending = $this->input->post('pending');

        $status = [];

        if($_released == '1') array_push($status, ' locate(\'"Released"\', status)');
        if($_not_released == '1') array_push($status, 'locate(\'"Not Released"\',status)');
        if($_pending == '1') array_push($status, 'locate(\'"Pending"\', status)');

        $status = join(' OR ',$status);

        $result = $this->rm->requestsReport($_from, $_to, $status);
        
        $reqStatus = [];

        foreach($result as $r) array_push($reqStatus, $r->_status);
        
        if(!in_array('Pending', $reqStatus) && $_pending == 1) array_push($result, ['_status' => 'Pending', 'total' => 0]);
        if(!in_array('Released', $reqStatus) && $_released == 1) array_push($result, ['_status' => 'Released', 'total' => 0]);
        if(!in_array('Not Released', $reqStatus) && $_not_released == 1) array_push($result, ['_status' => 'Not Released', 'total' => 0]);

        
        echo to_JSON($result);

    }

    public function per_requested_file() {
        $_from = $this->input->post('_from');
        $_to = $this->input->post('_to');

        $files = to_ARRAY($this->input->post('files'));

        $files = array_map(function($file){return "\"$file\""; }, $files);

        $files = join(',', $files);

        $files = '(' . $files . ')';

        $condition = "";

        if(!empty($files)) $condition .= " frc.name in " . $files;
        if(!empty($_from) && !empty($_to)) {
            if(strlen($condition) > 0) $condition .= " AND ";
            $condition .= " r.created_at BETWEEN '{$_from}' and '{$_to}'";
        }

        if(strlen($condition) > 0) $condition .= " AND ";
        $condition .= " locate('\"Released\"', r.status) ";
        

        $condition = "WHERE " . $condition;
        $result = $this->rm->per_requested_file($condition);

        echo to_JSON($result);
        
    }
}