<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Page extends CI_Controller
{

  private $m_role = '';
  private $m_hasUID = false;

  public function __construct()
  {
    parent::__construct(); // inherit all the methods, attributes  and etc. from parent

    $this->load->model("Student_model", "stud");
    $this->load->model("Shelf_model", "shelves");

    $this->m_role = $this->session->userdata('role');
    $this->m_hasUID = $this->session->has_userdata('uid');
  }

  private function loadPage($page, $data = [])
  {
    extract($data);
    $fname = $this->session->userdata('fname');
    $lname = $this->session->userdata('lname');
    $mname = $this->session->userdata('mname');
    $fullname = $lname . ((!empty($fname) && !empty($mname)) ? (', ' . $fname . ' ' . $mname) : '');
    $username = $this->session->userdata('uname');

    $header['constants'] = [
      'page_url' => $page,
      'role' => $this->session->userdata('role'),
      'username' => $username,
      'fullname' => empty($fullname) ? $username : $fullname,
      'myname' => !empty($fname) ? $fname : (!empty($lname) ? $lname : $username),
      'uid' => $this->session->userdata('uid'),
    ];

    if ($page != "login") $this->load->view("templates/header", $header);
    if ($page) $this->load->view("pages/$page", isset($main) ? $main : []);
    if ($page != "login") $this->load->view("templates/footer", isset($footer) ? $footer : []);
  }


  // Login
  public function index()
  {
    if ($this->m_hasUID) {
      redirect('dashboard');
      return;
    }

    $this->loadPage("login");
  }


  // Dashboard
  public function dashboard()
  {
    if (!$this->m_hasUID) {
      redirect('');
      return;
    }

    $this->loadPage('dashboard');
  }



  // Manage Users
  public function users_all()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('users/user-all');
  }

  public function users_new()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('users/user-new');
  }

  public function users_logs()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('users/user-logs');
  }



  // Manage Shleves
  public function shelf_all()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }

    $this->loadPage('shelf/shelf-all');
  }

  public function shelf_new()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('shelf/shelf-new');
  }

  public function shef_archived()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('shelf/shelf-archived');
  }

  public function shelf_entry($id)
  {
    if (!$this->m_hasUID) {
      redirect('');
      return;
    }

    $data['main'] = ['name' => $id];

    $this->loadPage('shelf/shelf-entry', $data);
  }



  // Manage Requests
  public function request_fileCateg()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('request/request-file-category');
  }

  public function request_new()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role == 'E') {
      redirect('');
      return;
    }

    $this->loadPage('request/request-new');
  }

  public function request_all()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role == 'E') {
      redirect('');
      return;
    }

    $this->loadPage('request/request-all');
  }

  public function request_archived()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('request/request-archived');
  }

  public function request_file_categofy_archived()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('request/request-file-category-archived');
  }



  // Manage Records
  public function records_new()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role == 'V') {
      redirect('');
      return;
    }

    $this->loadPage('record/record-new');
  }

  public function records_archived()
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }
    if ($this->m_role != 'A') {
      redirect('');
      return;
    }

    $this->loadPage('record/record-archived');
  }

  public function record_entry($id)
  {

    if (!$this->m_hasUID) {
      redirect('');
      return;
    }

    $data['main'] = ['record_name' => $id];

    $this->loadPage('record/record-entry', $data);
  }

}
