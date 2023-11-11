<?php

use PhpParser\Node\Expr\Cast\Array_;

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
    return $controller->db->query("INSERT INTO `user_logs` SET 
        `title`='{$title}', 
        `details`='{$activity}',
        `created_by`='{$uid}',
        `created_date`=CURRENT_TIMESTAMP
    ");
}