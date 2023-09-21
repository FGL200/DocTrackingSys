<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// DEFAULT
$route['default_controller'] = 'Page/index';
$route['login'] = 'Page/index';
$route['home'] = 'Page/home';

// CUSTOM
$route['student/insert-record']['post'] = "Student/addRecord";
$route['student/all'] = "Student/get_Student_List";
$route['student/(:any)'] = 'Student/get_Student_Records/$1';

// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
