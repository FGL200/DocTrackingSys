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
            $result['agree'] = '0';
            $this->session->set_userdata($result);
            echo json_encode(["result"=>true]);
        }else
            echo json_encode(["result"=>false]);
    }

    public function logout(){
        $this->session->sess_destroy();
        echo "<script>
                    window.localStorage.removeItem('agree');
                    window.location.href = '".DOC_TRACK_BASE_URL."'; 
              </script>";
        // redirect(base_url());
    }
}



?>