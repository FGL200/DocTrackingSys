<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;

class Page extends CI_Controller {

    public function __construct()
    {
        parent::__construct(); // inherit all the methods, attributes  and etc. from parent
        
        $this->load->model("Student_model", "stud");
        $this->load->model("Shelves_model", "shelves");
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
            redirect('dashboard');
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
            'js' => ['alert', 'login']
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


        $uid = $this->session->userdata('uid');
        $role = $this->session->userdata('role');

        $shelves = $this->shelves->getShelvesAndInfo();
        $total_records_in_bin = count($this->stud->get_stud_rec_trashBin($uid)) ?? 0;
        
        $data['header'] = [
            'title' => 'Dashboard',
            'uid' => $uid,
            'role' => $role,
            // 'hide_nav' => true,
            'constants' => ["role" => $role],
            'css' => ["dashboard"],
            'shelves' => $shelves,
            'bin_records' => $total_records_in_bin
        ];
        $data['footer'] = [
            'js' => ['alert', 'dashboard', 'profile', 'termsAndCondition']
        ];

        $this->loadPage('dashboard', $data);
    }

    public function shelf($shelf_name) {
        if(!$this->session->has_userdata('uid')){
            redirect(''); // para yung url is http://localhost/DocTrackingSys' 
            // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
            return;
        }

        if($this->session->userdata("agree") == "0") {
            redirect("dashboard");
        } 

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> ucfirst($shelf_name),
            'css' => ['shelf'],
            'profile' => $this->session->userdata(),
            'constants' => [
                'shelf_name' => $shelf_name
            ]
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['alert', 'newRecord','profile', 'scan_qr', 'shelf']
        ];

        // load page
        $this->loadPage("shelf", $data);
    }

    public function record($record_id){
        if(!$this->session->has_userdata('uid')){
            redirect(''); // para yung url is http://localhost/DocTrackingSys' 
            // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
            return;
        }

        if($this->session->userdata("agree") == "0") {
            redirect("dashboard");
        } 

        // $rec_id - is the integer value
        // $record_id - is the string value
        $rec_id = intval($record_id);

        $studData = $this->stud->get_Student_all_Record($rec_id);
        if(!$studData) redirect('');
        $role = $this->session->userdata('role');

        // HEADER VARIABLES
        $data['header'] = [
            'title'=> "#{$record_id}",
            'record_id' => $record_id,
            'role' => $role,
            'studData' => $studData,
            'css' => ['viewRecord'],
            'constants' => [
                'record_id' => $record_id, 
                'role' => $role
            ]
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['viewRecord', 'alert','profile']
        ];

        // load page
        $this->loadPage("viewRecord", $data);
    }

    public function manage_users() {
        if(!$this->session->has_userdata('uid')){
            redirect('');
            return;
        }

        $role = $this->session->userdata('role');

        if($role != 'A'){
            redirect('');
            return;
        }

        if($this->session->userdata("agree") == "0") {
            redirect("dashboard");
        } 

        $data['header'] = [
            'title' => 'Manage Users',
            'css' => ['manage_users']
        ];

        $data['footer'] = [
            'js' => ['alert', 'manage_users', 'profile']
        ];

        $this->loadPage("manage_users", $data);
    }

    
    public function generate_qr() {
        if($this->session->userdata("role") != "A"){
            redirect("");
        }

        // if($this->session->userdata("agree") == "0") {
        //     redirect("dashboard");
        // } 

        $data['header'] = [
            'css' => ['generate_qr'],
            'title' => "Generate QR"
        ];

        $data['footer'] = [
            'js' => ['generate_qr', 'profile']
        ];

        $this->loadPage('generated_qr', $data);
    }

    public function user_logs() {
        
        if($this->session->userdata("role") != "A"){
            redirect("");
            return;
        }

        if($this->session->userdata("agree") == "0") {
            redirect("dashboard");
        } 

        $data['header'] = [
            'title' => "User Logs"
        ];

        $data['footer'] = [
            'js' => ['user_logs', 'profile']
        ];

        $this->loadPage('user_logs', $data);
    }

    public function requests() {
      $data['header'] = [
        'title' => 'Requests'
      ];

      $data['footer'] = [
        'js' => ['requests', 'profile'],
      ];

      $this->loadPage('requests', $data);
    }
}
