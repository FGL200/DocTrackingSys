<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// DEFAULT
$route['default_controller'] = 'Page/index';
$route['login'] = 'Page/index';
$route['home'] = 'Page/home';

// CUSTOM
$route['student/insert-record'] = "Student/addRecord";

// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
