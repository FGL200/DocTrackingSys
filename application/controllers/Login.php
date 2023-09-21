<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model', 'user_');
    }
    /**
     * login user
     */
    public function index() {
        $username = $this->input->post('username');
        $password = $this->input->post('password');

        $result = $this->user_->login_user($username, $password);

        if($result) {
            $this->session->set_userdata($result);
            redirect('home');
            return;
        }         
        
    }

}



?>