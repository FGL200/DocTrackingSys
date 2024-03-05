<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;

class Page extends CI_Controller
{

  public function __construct()
  {
    parent::__construct(); // inherit all the methods, attributes  and etc. from parent

    $this->load->model("Student_model", "stud");
    $this->load->model("Shelves_model", "shelves");
  }

  private function loadPage($page, $data = [])
  {
    extract($data);
    $fname = $this->session->userdata('fname');
    $lname = $this->session->userdata('lname');
    $lname = $this->session->userdata('mname');
    $fullname = $lname . (!empty($fname) || !empty($mname)) ? (', ' . $fname . ' ' . $mname) : '';
    $username = $this->session->userdata('uname');

    $header['constants'] = [
      'page_url' => $page,
      'role' => $this->session->userdata('role'),
      'username' => $username,
      'fullname' => empty($fullname) ? $username : $fullname,
      'uid' => $this->session->userdata('uid'),
    ];

    if ($page != "login") $this->load->view("templates/header", $header);
    if ($page) $this->load->view("pages/$page", isset($main) ? $main : []);
    if ($page != "login") $this->load->view("templates/footer", isset($footer) ? $footer : []);
  }


  // Login
  public function index()
  {
    if ($this->session->has_userdata('uid')) {
      redirect('dashboard');
      return;
    }

    $this->loadPage("login");
  }


  // Dashboard
  public function dashboard()
  {
    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('dashboard');
  }



  // Manage Users
  public function users_all()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('users/user-all');
  }

  public function users_new()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('users/user-new');
  }

  public function users_logs()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('users/user-logs');
  }



  // Manage Shleves
  public function shelf_all()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('shelf/shelf-all');
  }

  public function shelf_new()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('shelf/shelf-new');
  }

  public function shef_archived()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('shelf/shelf-archived');
  }

  public function shelf_entry($id)
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('shelf/shelf-entry');
  }



  // Manage Requests
  public function request_fileCateg()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('request/request-file-category');
  }

  public function request_new()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('request/request-new');
  }

  public function request_all()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('request/request-all');
  }

  public function request_archived()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('request/request-archived');
  }



  // Manage Records
  public function records_new()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('record/record-new');
  }

  public function records_archived()
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('record/record-archived');
  }

  public function record_entry($id)
  {

    if (!$this->session->has_userdata('uid')) {
      redirect('');
      return;
    }

    $this->loadPage('record/record-entry');
  }








  // public function shelf($shelf_name)
  // {
  //   if (!$this->session->has_userdata('uid')) {
  //     redirect(''); // para yung url is http://localhost/DocTrackingSys' 
  //     // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
  //     return;
  //   }

  //   if ($this->session->userdata("agree") == "0") {
  //     redirect("dashboard");
  //   }

  //   // HEADER VARIABLES
  //   $data['header'] = [
  //     'title' => ucfirst($shelf_name),
  //     'css' => ['shelf'],
  //     'profile' => $this->session->userdata(),
  //     'constants' => [
  //       'shelf_name' => $shelf_name
  //     ]
  //   ];

  //   // FOOTER VAIRABLES
  //   $data['footer'] = [
  //     'js' => ['alert', 'newRecord', 'profile', 'scan_qr', 'shelf']
  //   ];

  //   // load page
  //   $this->loadPage("shelf", $data);
  // }

  // public function record($record_id)
  // {
  //   if (!$this->session->has_userdata('uid')) {
  //     redirect(''); // para yung url is http://localhost/DocTrackingSys' 
  //     // $this->index(); //pag eto kasi, yung url is for home page  'http://localhost/DocTrackingSys/home#'
  //     return;
  //   }

  //   if ($this->session->userdata("agree") == "0") {
  //     redirect("dashboard");
  //   }

  //   // $rec_id - is the integer value
  //   // $record_id - is the string value
  //   $rec_id = intval($record_id);

  //   $studData = $this->stud->get_Student_all_Record($rec_id);
  //   if (!$studData) redirect('');
  //   $role = $this->session->userdata('role');

  //   // HEADER VARIABLES
  //   $data['header'] = [
  //     'title' => "#{$record_id}",
  //     'record_id' => $record_id,
  //     'role' => $role,
  //     'studData' => $studData,
  //     'css' => ['viewRecord'],
  //     'constants' => [
  //       'record_id' => $record_id,
  //       'role' => $role
  //     ]
  //   ];

  //   // FOOTER VAIRABLES
  //   $data['footer'] = [
  //     'js' => ['viewRecord', 'alert', 'profile']
  //   ];

  //   // load page
  //   $this->loadPage("viewRecord", $data);
  // }

  // public function manage_users()
  // {
  //   if (!$this->session->has_userdata('uid')) {
  //     redirect('');
  //     return;
  //   }

  //   $role = $this->session->userdata('role');

  //   if ($role != 'A') {
  //     redirect('');
  //     return;
  //   }

  //   if ($this->session->userdata("agree") == "0") {
  //     redirect("dashboard");
  //   }

  //   $data['header'] = [
  //     'title' => 'Manage Users',
  //     'css' => ['manage_users']
  //   ];

  //   $data['footer'] = [
  //     'js' => ['alert', 'manage_users', 'profile']
  //   ];

  //   $this->loadPage("manage_users", $data);
  // }


  // public function generate_qr()
  // {
  //   if ($this->session->userdata("role") != "A") {
  //     redirect("");
  //   }

  //   // if($this->session->userdata("agree") == "0") {
  //   //     redirect("dashboard");
  //   // } 

  //   $data['header'] = [
  //     'css' => ['generate_qr'],
  //     'title' => "Generate QR"
  //   ];

  //   $data['footer'] = [
  //     'js' => ['generate_qr', 'profile']
  //   ];

  //   $this->loadPage('generated_qr', $data);
  // }

  // public function user_logs()
  // {

  //   if ($this->session->userdata("role") != "A") {
  //     redirect("");
  //     return;
  //   }

  //   if ($this->session->userdata("agree") == "0") {
  //     redirect("dashboard");
  //   }

  //   $data['header'] = [
  //     'title' => "User Logs"
  //   ];

  //   $data['footer'] = [
  //     'js' => ['user_logs', 'profile']
  //   ];

  //   $this->loadPage('user_logs', $data);
  // }

  // public function requests()
  // {

  //   $role = $this->session->userdata('role');
  //   $data['header'] = [
  //     'title' => 'Requests',
  //     'constants' => [
  //       'role' => $role
  //     ]
  //   ];

  //   $data['footer'] = [
  //     'js' => ['requests', 'profile'],
  //   ];

  //   $this->loadPage('requests', $data);
  // }
}
