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
        if(!$this->session->has_userdata('uid')){
            redirect(''); // para yung url is http://localhost/DocTrackingSys' 
            // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
            return;
        }

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> 'Dashboard',
            'css' => ['home'],
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
            'js' => ['home']
        ];

        // load page
        $this->loadPage("home", $data);
    }

    public function record($record_id){
        $record_id = intval($record_id);

        $record_data = $this->stud->get_Student_all_Record($record_id);

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> $record_data['First Name'],
            'css' => [],
            'stud_data' => $record_data
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['viewRecord']
        ];

        // load page
        $this->loadPage("viewRecord", $data);
    }
}
