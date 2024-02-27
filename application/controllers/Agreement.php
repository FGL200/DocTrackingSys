<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Agreement extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    public function set() {
        $this->session->set_userdata(['agree' => '1']);

        echo json_encode(['agree' => $this->session->userdata("agree")]);
    }

    public function get() {
        echo json_encode(['agree' => $this->session->userdata("agree")]);
    }
}

?>