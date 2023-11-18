<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// DEFAULT
$route['default_controller'] = 'Page/index';

// PAGES
$route['login'] = 'Page/index';
$route['shelf/(:any)'] = 'Page/shelf/$1';
$route['dashboard'] = 'Page/dashboard';
$route['record/(:num)'] = 'Page/record/$1';
$route['manage'] = 'Page/manage_users';
$route['generate-qr']= "Page/generate_qr";
$route['async']["post"] = "Student/async";
$route['logs']= "Page/user_logs";


// API
$route['student/record/insert/excel']['post'] = 'Student/addExcel';
$route['student/record/insert']['post'] = 'Student/addRecord';
$route['student/record/update']['post'] = 'Student/update_Student_Records';
$route['student/record/all']['post'] = 'Student/get_StudentRecords_With_Remarks';
$route['student/record/(:num)'] = 'Student/get_Student_Records/$1';
$route['student/record/select']['post'] = 'Student/get_all_stud_rec_as_select';
$route['student/build_qr']['post'] = 'Student/build_qr';
$route['student/record/trash']['post'] = 'Student/trashBin';


$route['student/record/by/(:num)'] = 'Student/get_Student_Records_By/$1';
$route['student/record/by/(:num)/last'] = 'Student/get_Last_Student_Records_By/$1';
$route['student/filter']['post'] = 'Student/filter_search';
$route['student/record/delete']['post'] = "Student/delete_Student";
$route['api/categories'] = 'RemarkCategory/getCategories';
$route['api/shelves'] = 'Shelves/getAll';


// USER
$route['user/new']['post'] = 'User/new';
$route['user/login']['post'] = 'Login';
$route['user/logout'] = 'Login/logout';

$route['user/viewers']['post'] = 'User/get_All_Viewers';
$route['user/encoders']['post'] = 'User/get_All_Encoders';
$route['user/all']['post'] = 'User/get_All_Users';
$route['user']['post'] = 'User/get_user';
$route['user/update']['post'] = 'User/update';
$route['user/all/encodes']['post'] = 'User/total_Encoded_By_Users';
$route['user/monthly/encodes']['post'] = 'User/monthly_Encoded_By_Users';
$route['user/logs'] = 'User/get_User_Logs';

// Shelf
$route['shelves/insert']['post'] = 'Shelves/add_Shelf';

// Agree
$route['set_agree']['post'] = 'Agreement/set_agree';
$route['get_agree']['post'] = 'Agreement/get_agree';

// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
