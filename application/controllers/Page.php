<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Page extends CI_Controller {

    // load page with header and footer
    private function loadPage($page, $data = []){
        extract($data);
        $this->load->view("templates/header", isset($header) ? $header : []);
        $this->load->view("pages/$page", isset($main) ? $main : []);
        $this->load->view("templates/footer", isset($footer) ? $footer : []);
    }


    public function index(){ 

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> 'Login',
            'css' => ['login'],
            'hide_acc' => true
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['main', 'header', 'login']
        ];

        // load page
        $this->loadPage("login", $data);
    }


    public function home() {
        // HEADER VARIABLES
        $data['header'] = [
            'title'=> 'home',
            'css' => []
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['main']
        ];

        // load page
        $this->loadPage("home", $data);
    }


    public function about() {
         // HEADER VARIABLES
         $data['header'] = [
            'title'=> 'About',
            'css' => []
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['main']
        ];

        // load page
        $this->loadPage("about", $data);
    }
}
