<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Page extends CI_Controller {

    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("Student_model", "stud");
    }

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
        if($this->session->has_userdata('uid')){
            redirect('home');
            //$this->home();
            return;
        }

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> 'Login',
            'css' => ['login'],
            'hide_nav' => true
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['login']
        ];

        // load page
        $this->loadPage("login", $data);
    }

    public function dashboard() {
        if(!$this->session->has_userdata('uid')){
            redirect(''); // para yung url is http://localhost/DocTrackingSys' 
            // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
            return;
        }

        $data["header"] = [
            "title" => "Dashboard",
            "uid" => 0,
            'hide_nav' => true
        ];
        $data["footer"] = [
            "js" => ["alert"]
        ];

        $this->loadPage("dashboard", $data);
    }


    public function home() {
        if(!$this->session->has_userdata('uid')){
            redirect(''); // para yung url is http://localhost/DocTrackingSys' 
            // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
            return;
        }

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> 'Home',
            'css' => ['home','viewRecord'],
            'profile' => [
                'uname' => '',
                'fname' => '',
                'lname' => '',
                'bday' => date('mm/dd/yyyy'),
                'g' => 'N',
            ]
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['home','newRecord']
        ];

        // load page
        $this->loadPage("home", $data);
    }

    public function record($record_id){
        if(!$this->session->has_userdata('uid')){
            redirect(''); // para yung url is http://localhost/DocTrackingSys' 
            // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
            return;
        }

        // $rec_id - is the integer value
        // $record_id - is the string value
        $rec_id = intval($record_id);

        $studData = $this->stud->get_Student_all_Record($rec_id);
        if(!$studData) redirect('home');
        $fname = $studData['stud_fname'];
        $role = $this->session->userdata('role');

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> $fname,
            'constants' => [
                'record_id' => $rec_id, 
                'role' => $role
            ],
            'record_id' => $record_id,
            'role' => $role,
            'css' => ['viewRecord'],
            'profile' => [
                'uname' => '',
                'fname' => '',
                'lname' => '',
                'bday' => date('mm/dd/yyyy'),
                'g' => 'N',
            ],
            'studData' => $studData
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['viewRecord']
        ];

        // load page
        $this->loadPage("viewRecord", $data);
    }
}
