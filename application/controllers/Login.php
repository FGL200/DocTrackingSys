<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
    public function index(){

        // HEADER VARIABLES
        $header['css'] = ['login'];
        $header['js'] = ['main', 'login'];
        $header['title'] = 'Login';

        // MAIN PAGE VARIABLES


        // FOOTER VAIRABLES

        $this->load->view("templates/header", isset($header) ? $header : []);
        $this->load->view("pages/login");
        $this->load->view("templates/footer", isset($footer) ? $footer : []);
    }
}
