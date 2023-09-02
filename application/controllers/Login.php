<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
    public function index(){

        // HEADER VARIABLES
        $header['title'] = 'Login';
        $header['css'] = ['login'];
        $header['hide_acc'] = false;

        // MAIN PAGE VARIABLES


        // FOOTER VAIRABLES
        $footer['js'] = ['main', 'header', 'login'];

        $this->load->view("templates/header", isset($header) ? $header : []);
        $this->load->view("pages/login", isset($main) ? $main : []);
        $this->load->view("templates/footer", isset($footer) ? $footer : []);
    }
}
