<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Page extends CI_Controller {

    /**
     * Load Page
     * @param String $page
     * @param Array $data
     */
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
            'css' => [],
            'hide_nav' => true
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['login']
        ];

        // load page
        $this->loadPage("login", $data);
    }


    public function home() {
        // HEADER VARIABLES
        $data['header'] = [
            'title'=> 'home',
            'css' => ['home']
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['home']
        ];

        // load page
        $this->loadPage("home", $data);
    }

    public function record($record_id){

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> $record_id,
            'css' => []
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => []
        ];

        // load page
        $this->loadPage("viewRecord", $data);
    }
}
