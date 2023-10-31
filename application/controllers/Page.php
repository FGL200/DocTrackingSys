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

        $uid = $this->session->userdata('uid');
        $role = $this->session->userdata('role');

        $data['header'] = [
            'title' => 'Dashboard',
            'uid' => $uid,
            'role' => $role,
            // 'hide_nav' => true,
            'constants' => ["role" => $role],
            'css' => ["dashboard"]
        ];
        $data['footer'] = [
            'js' => ['alert', ($role === 'A') ? 'dashboard' : null, 'profile']
        ];

        $this->loadPage('dashboard', $data);
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
            'profile' => $this->session->userdata()
        ];

        // FOOTER VAIRABLES
        $data['footer'] = [
            'js' => ['alert', 'newRecord','profile', 'scan_qr', 'home']
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
        if($this->session->userdata("role") == "A"){
            redirect("home");
        }

        // if (!class_exists('chillerlan\QRCode\QRCode')) {
        //     require 'C:\xampp\htdocs\DocTrackingSys\vendor\autoload.php';
        // }
        
        // $data['qr_list'] = [];

        // $students = $this->stud->get_StudentRecords_With_Remarks();

        // foreach($students as $k => $v) {
        //     $text = json_encode(['First Name' => $v['First Name'],'Last Name' => $v['Last Name'],'Middle Name' => $v['Middle Name']]);
            

        //     $result =Builder::create()
        //     ->writer(new PngWriter())
        //     ->writerOptions([])
        //     ->data($text)
        //     ->encoding(new Encoding('UTF-8'))
        //     ->errorCorrectionLevel(new ErrorCorrectionLevelHigh())
        //     ->size(300)
        //     ->margin(10)
        //     ->roundBlockSizeMode(new RoundBlockSizeModeMargin())
        //     ->logoPath('C:\xampp\htdocs\DocTrackingSys\assets\images\rtu-logo.png')
        //     ->logoResizeToWidth(100)
        //     ->logoPunchoutBackground(false)
        //     // ->labelText($v['First Name'] . " " . $v['Last Name'])
        //     ->validateResult(false)
        //     ->build();
        
        // // Generate a data URI to include image data inline (i.e. inside an <img> tag)
        //     $dataUri = $result->getDataUri();
        //     array_push($data['qr_list'],"<img src='$dataUri'>");
        // }
        $data['header'] = [
            'css' => ['generate_qr']
        ];

        $data['footer'] = [
            'js' => ['generate_qr']
        ];

        $this->loadPage('generated_qr', $data);
    }
}
