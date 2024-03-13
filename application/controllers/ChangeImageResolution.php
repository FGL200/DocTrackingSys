<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ChangeImageResolution extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    public function upload() {
        $path = str_replace('\\', '/', BASEPATH);
        $path = str_replace('system/', 'uploads/', $path);

        if(!is_dir($path)) mkdir($path,DIR_WRITE_MODE, true);

        echo to_JSON([optimize_image($_FILES['image'], 100000, 6, $path, 'l')]);
    }

}