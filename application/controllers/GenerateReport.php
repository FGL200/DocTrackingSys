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

        if($_released == '1') array_push($status, ' locate("Released", status)');
        if($_not_released == '1') array_push($status, 'locate("Not Released",status)');
        if($_pending == '1') array_push($status, 'locate("Pending", status)');

        $status = join(' OR ',$status);

        $result = $this->rm->requestsReport($_from, $_to, $status);
        
        $reqStatus = [];

        foreach($result as $r) array_push($reqStatus, $r->_status);
        
        if(!in_array('Pending', $reqStatus)) array_push($result, ['_status' => 'Pending', 'total' => 0]);
        if(!in_array('Released', $reqStatus)) array_push($result, ['_status' => 'Released', 'total' => 0]);
        if(!in_array('Not Released', $reqStatus)) array_push($result, ['_status' => 'Not Released', 'total' => 0]);

        
        echo to_JSON($result);

    }
}