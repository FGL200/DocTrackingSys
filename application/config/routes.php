<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// DEFAULT
$route['default_controller'] = 'Page/index';
$route['login'] = 'Page/index';
$route['home'] = 'Page/home';

// CUSTOM
$route['student/insert-record']['post'] = "Student/addRecord";
$route['record/(:any)'] = 'Student/get_Student_Records/$1';

// API
$route['api/allrecords'] = "Student/get_Student_List";
$route['api/categories'] = "RemarkCategory/getCategories";

// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
