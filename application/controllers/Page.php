<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Page extends CI_Controller {

    // load page with header and footer
    private function loadPage($page, $data = []){
        extract($data);
        $this->load->view("templates/header", $header);
        $this->load->view("pages/$page", $main);
        $this->load->view("templates/footer", $footer);
    }


    public function index(){ 
        // HEADER VARIABLES
        $header['title'] = 'Login';
        $header['css'] = ['login'];

        // MAIN PAGE VARIABLES


        // FOOTER VAIRABLES
        $footer['js'] = ['main', 'header', 'login'];

        // load page
        $this->loadPage("login", $header, [], $footer);
    }


    public function home() {
        // HEADER VARIABLES
        $data['header'] = [
            'title'=> 'home',
            'css' => [],
            'hide_acc' => false
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
        $header['title'] = 'About';
        $header['css'] = [];
        $header['hide_acc'] = false;

        // MAIN PAGE VARIABLES


        // FOOTER VAIRABLES
        $footer['js'] = ['main'];

        // load page
        $this->loadPage("about", $header, [], $footer);
    }
}
