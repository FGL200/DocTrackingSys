<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// DEFAULT
$route['default_controller'] = 'Page/index';
$route['login'] = 'Page/index';
$route['home'] = 'Page/home';
$route['record/(:num)'] = 'Page/record/$1';

// API
$route['student/insert-record']['post'] = "Student/addRecord";
$route['student/all'] = "Student/get_All_Student_List";
$route['student/(:num)'] = 'Student/get_Student_Records/$1';
$route['login'] = 'Login';

// USER
$route['new_user']["post"] = "User/new";

// API
$route['api/categories'] = "RemarkCategory/getCategories";

// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
