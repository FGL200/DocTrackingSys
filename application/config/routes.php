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
$route['request/file-categories-archived'] = 'Page/request_file_categofy_archived';
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
$route['api/student/record/add']['post'] = 'Student/addRecord';
$route['api/student/record/(:num)/update']['post'] = 'Student/update_Student_Records/$1';
$route['api/student/record/all']['post'] = 'Student/get_StudentRecords_With_Remarks';
$route['api/student/record/(:num)'] = 'Student/get_Student_Records/$1';
$route['api/student/record/select']['post'] = 'Student/get_all_stud_rec_as_select';
$route['api/student/record/trash']['post'] = 'Student/trashBin';
$route['api/student/record/move/(:num)']['post'] = 'Student/moveRecord/$1';

$route['api/student/record/by/(:num)'] = 'Student/get_Student_Records_By/$1';
$route['api/student/record/by/(:num)/last'] = 'Student/get_Last_Student_Records_By/$1';
$route['api/student/filter']['post'] = 'Student/filter_search';
$route['api/student/record/(:num)/delete']['post'] = "Student/delete_Student/$1";

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
$route['api/user/logs']['post'] = 'User/get_User_Logs';

// Shelf
$route['api/shelf/insert']['post'] = 'Shelf/add';
$route['api/shelf/(:num)/update']['post'] = 'Shelf/update/$1';
$route['api/shelf/(:num)/delete']['post'] = 'Shelf/delete/$1';
$route['api/shelf/name'] = 'Shelf/getAllNames';
$route['api/shelf/all-info'] = 'Shelf/getShelvesAndInfo';
$route['api/shelf/archives'] = 'Shelf/archives';

// Agree
$route['api/agree/set']['post'] = 'Agreement/set'; // set agree status
$route['api/agree/get']['post'] = 'Agreement/get'; // get agree status

// Requests
$route['api/request/create']['post'] = 'Request/create';    // creation of request
$route['api/request/all']['post'] = 'Request/fetch_all';    // fetch all records
$route['api/request/(:num)'] = 'Request/fetch/$1';          // fetch specific request by ID
$route['api/request/(:num)/update'] = 'Request/update/$1';  // update request by ID 
$route['api/request/(:num)/delete'] = 'Request/delete/$1';  // delete request by ID
$route['api/request/archives'] = 'Request/archives';        // requests in archives
$route['api/request/search']['post'] = 'Request/search';

// Filerequests Category
$route['api/file-request-category/all'] = 'FileRequestCategory/get';
$route['api/file-request-category/(:num)'] = 'FileRequestCategory/get/$1 ';
$route['api/file-request-category/add']['post'] = 'FileRequestCategory/add';
$route['api/file-request-category/(:num)/update']['post'] = 'FileRequestCategory/update/$1';
$route['api/file-request-category/(:num)/delete']['post'] = 'FileRequestCategory/delete/$1';
$route['api/file-request-category/archives'] = 'FileRequestCategory/archives';   

// Report 
$route['api/report/requests']['post'] = 'GenerateReport/requests';
$route['api/report/file-requests']['post'] = 'GenerateReport/per_requested_file';

// ------------------ /End API ------------------ 


// DEFAULT
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
