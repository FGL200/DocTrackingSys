<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// DEFAULT
$route['default_controller'] = 'Page/index';

// PAGES
$route['login'] = 'Page/index';
$route['home'] = 'Page/home';
$route['record/(:num)'] = 'Page/record/$1';

// API
$route['student/record/insert']['post'] = 'Student/addRecord';
$route['student/record/update']['post'] = 'Student/update_Student_Records';
$route['student/record/all'] = 'Student/get_StudentRecords_With_Remarks';
$route['student/record/(:num)'] = 'Student/get_Student_Records/$1';

$route['student/record/by/(:num)'] = 'Student/get_Student_Records_By/$1';
$route['student/record/by/(:num)/last'] = 'Student/get_Last_Student_Records_By/$1';
$route['student/filter']['post'] = 'Student/filter_search';
$route['student/record/delete']['post'] = "Student/delete_Student";
$route['student/generateQR/all'] = 'Student/generateQR';
$route['api/categories'] = 'RemarkCategory/getCategories';


// USER
$route['user/new']['post'] = 'User/new';
$route['user/login']['post'] = 'Login';
$route['user/logout'] = 'Login/logout';

$route['user/viewers']['post'] = 'User/get_All_Viewers';
$route['user/encoders']['post'] = 'User/get_All_Encoders';
$route['user/all']['post'] = 'User/get_All_Users';
$route['user/update']['post'] = 'User/update';

/// QR
$route['generate-qr']= "QrGenerator/generate";

// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
