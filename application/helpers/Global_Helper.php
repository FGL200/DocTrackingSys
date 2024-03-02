<?php

/**
 * Insert slashes to the characters like ["/\'`]
 * @param Array $inputs
 */
function insert_slashes(& $input, $pattern = "\/\"'`") {
    $input = addcslashes($input, $pattern);
}


/**
 * ADD TO USER LOGS
 * @param Controller $controller the current controller
 * @param Int $uid ID of the user
 * @param String $title Title of the action
 * @param String $activity the actual action (in SQL)
 */
function add_To_User_Logs(& $controller, $uid = null, $title = null, $activity = null) : bool {
    if (!$uid) return false;
    if (!$title) return false;
    if (!$activity) return false;
    insert_slashes($title);
    insert_slashes($activity);
    $query = "INSERT INTO `user_logs` SET 
        `title`='{$title}', 
        `details`='{$activity}',
        `created_by`='{$uid}',
        `created_date`=CURRENT_TIMESTAMP
    ";
    return $controller->db->query($query);
}


/**
 * get request body
 * @param Controller $controllerr current controller
 */

 function get_Request_Body(& $controller) : mixed{
    return ((array)json_decode($controller->input->raw_input_stream));
 }

 function to_JSON(array $val) : string | false{
    return json_encode($val);
 }

 function to_ARRAY(string $val) : mixed {
    return json_decode($val);
 }

 function disable_db_debugging(& $controller) : void {
    $controller->db->db_debug = false;
 }