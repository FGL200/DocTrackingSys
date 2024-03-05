<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// DEFAULT
$route['default_controller'] = 'Page/index';

// ------------------ Start Pages ------------------ 

// $route['async']["post"] = "Student/async";
// $route['generate-qr']= "Page/generate_qr";

// Login
$route['login'] = 'Page/index';

// Dashboard
$route['dashboard'] = 'Page/dashboard';

// Manage Users
$route['user/all'] = 'Page/users_all';
$route['user/new'] = 'Page/users_new';
$route['user/logs'] = 'Page/users_logs';

// Manage Shelves
$route['shelf/all'] = 'Page/shelf_all';
$route['shelf/new'] = 'Page/shelf_new';
$route['shelf/archived'] = 'Page/shef_archived';
$route['shelf/entry/(:any)'] = 'Page/shelf_entry/$1';

// Request
$route['request/file-categories'] = 'Page/request_fileCateg';
$route['request/new'] = 'Page/request_new';
$route['request/all'] = 'Page/request_all';
$route['request/archived'] = 'Page/request_archived';

// Student Records
$route['record/new'] = 'Page/records_new';
$route['record/entry/(:num)'] = 'Page/record_entry/$1';
$route['record/archived'] = 'Page/records_archived';

// ------------------ /End Pages ------------------



// ------------------ Start API ------------------
$route['api/student/record/insert/excel']['post'] = 'Student/addExcel';
$route['api/student/record/insert']['post'] = 'Student/addRecord';
$route['api/student/record/update']['post'] = 'Student/update_Student_Records';
$route['api/student/record/all']['post'] = 'Student/get_StudentRecords_With_Remarks';
$route['api/student/record/(:num)'] = 'Student/get_Student_Records/$1';
$route['api/student/record/select']['post'] = 'Student/get_all_stud_rec_as_select';
$route['api/student/build_qr']['post'] = 'Student/build_qr';
$route['api/student/record/trash']['post'] = 'Student/trashBin';
$route['api/student/record/move']['post'] = 'Student/moveRecord';

$route['api/student/record/by/(:num)'] = 'Student/get_Student_Records_By/$1';
$route['api/student/record/by/(:num)/last'] = 'Student/get_Last_Student_Records_By/$1';
$route['api/student/filter']['post'] = 'Student/filter_search';
$route['api/student/record/delete']['post'] = "Student/delete_Student";

/**
 * METHOD : POST
 * 
 * BODY 
 * value string 
 */
$route['api/student/search']['post'] = 'Student/quick_search';

/**
 * METHOD => POST
 * 
 * BODY 
 * stud_fname string
 * stud_lname string
 * stud_mname string
 */
$route['api/student/record/shelf']['post'] = "Student/get_same_records_shelf";

/**
 * METHOD => POST
 * 
 * BODY 
 * stud_rec_id int => student record
 * shelf string => name ng shelf nung record
 */
$route['api/student/merged-records']['post'] = "Student/get_Merged_Records";

/**
 * METHOD => POST
 * (:num) => record id
 * 
 * BODY 
 * to int => id ng shelf kung san immerge
 */
$route['api/student/record/(:num)/merge'] = "Student/student_record_merge/$1";

$route['api/categories'] = 'RemarkCategory/getCategories';
$route['api/shelves'] = 'Shelves/getAll';


// USER
$route['api/user/new']['post'] = 'User/new';
$route['api/user/login']['post'] = 'Login';
$route['api/user/logout'] = 'Login/logout';

$route['api/user/viewers']['post'] = 'User/get_All_Viewers';
$route['api/user/encoders']['post'] = 'User/get_All_Encoders';
$route['api/user/all']['post'] = 'User/get_All_Users';
$route['api/user']['post'] = 'User/get_user';
$route['api/user/update']['post'] = 'User/update';
$route['api/user/all/encodes']['post'] = 'User/total_Encoded_By_Users';
$route['api/user/monthly/encodes']['post'] = 'User/monthly_Encoded_By_Users';
$route['api/user/logs'] = 'User/get_User_Logs';

// Shelf
$route['api/shelves/insert']['post'] = 'Shelves/add_Shelf';
$route['api/shelves/(:num)/update']['post'] = 'Shelves/update_Shelf/$1';
// Agree
$route['api/agree/set']['post'] = 'Agreement/set'; // set agree status
$route['api/agree/get']['post'] = 'Agreement/get'; // get agree status

// Requests
$route['api/request/create']['post'] = 'Request/create';    // creation of request
$route['api/request/all']['post'] = 'Request/fetch_all';    // fetch all records
$route['api/request/(:num)'] = 'Request/fetch/$1';          // fetch specific request by ID
$route['api/request/(:num)/update'] = 'Request/update/$1';  // update request by ID 
$route['api/request/(:num)/delete'] = 'Request/delete/$1';  // delete request by ID

// ------------------ /End API ------------------ 


// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
