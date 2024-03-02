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
$route['requests']= "Page/requests";


// API
$route['student/record/insert/excel']['post'] = 'Student/addExcel';
$route['student/record/insert']['post'] = 'Student/addRecord';
$route['student/record/update']['post'] = 'Student/update_Student_Records';
$route['student/record/all']['post'] = 'Student/get_StudentRecords_With_Remarks';
$route['student/record/(:num)'] = 'Student/get_Student_Records/$1';
$route['student/record/select']['post'] = 'Student/get_all_stud_rec_as_select';
$route['student/build_qr']['post'] = 'Student/build_qr';
$route['student/record/trash']['post'] = 'Student/trashBin';
$route['student/record/move']['post'] = 'Student/moveRecord';

$route['student/record/by/(:num)'] = 'Student/get_Student_Records_By/$1';
$route['student/record/by/(:num)/last'] = 'Student/get_Last_Student_Records_By/$1';
$route['student/filter']['post'] = 'Student/filter_search';
$route['student/record/delete']['post'] = "Student/delete_Student";

/**
 * METHOD : POST
 * 
 * BODY 
 * value string 
 */
$route['student/search']['post'] = 'Student/quick_search';

/**
 * METHOD => POST
 * 
 * BODY 
 * stud_fname string
 * stud_lname string
 * stud_mname string
 */
$route['student/record/shelf']['post'] = "Student/get_same_records_shelf";

/**
 * METHOD => POST
 * 
 * BODY 
 * stud_rec_id int => student record
 * shelf string => name ng shelf nung record
 */
$route['student/merged-records']['post'] = "Student/get_Merged_Records";

/**
 * METHOD => POST
 * (:num) => record id
 * 
 * BODY 
 * to int => id ng shelf kung san immerge
 */
$route['student/record/(:num)/merge'] = "Student/student_record_merge/$1";

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
$route['shelves/(:num)/update']['post'] = 'Shelves/update_Shelf/$1';
// Agree
$route['agree/set']['post'] = 'Agreement/set'; // set agree status
$route['agree/get']['post'] = 'Agreement/get'; // get agree status

// Requests
$route['request/create']['post'] = 'Request/create';    // creation of request
$route['request/all']['post'] = 'Request/fetch_all';    // fetch all records
$route['request/(:num)'] = 'Request/fetch/$1';          // fetch specific request by ID
$route['request/(:num)/update'] = 'Request/update/$1';  // update request by ID 
$route['request/(:num)/delete'] = 'Request/delete/$1';  // delete request by ID


// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
