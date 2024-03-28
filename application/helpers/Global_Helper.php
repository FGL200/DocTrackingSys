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
        `created_date`='".current_date()."'
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


 function optimize_image($uploadTmp, $uploadPath, $uploadName, $uploadSize) {
    $sizeLimit = 500000; // 100000 = 1KB
    $restrainedQuality = 5; // quality of the image.

   if($uploadSize > $sizeLimit) {
      //open a stream for the uploaded image
      $streamHandle = @fopen($uploadTmp, 'r');
      //create a image resource from the contents of the uploaded image
      $resource = imagecreatefromstring(stream_get_contents($streamHandle));
  
      if(!$resource)
          die('Something wrong with the upload!');
  
      //close our file stream
      @fclose($streamHandle);
  
      //delete the temporary upload
      @unlink($uploadTmp);
      //move the uploaded file with a lesser quality
      return imagejpeg($resource, $uploadPath . $uploadName, $restrainedQuality); 
  } else {
      //the file size is less than the limit, just move the temp file into its appropriate directory
      return move_uploaded_file($uploadTmp, $uploadPath . $uploadName);
  }
}
 function getRoleByRoleID($roleID) {
  switch ($roleID) {
    case 'A': return 'Admin'; break;
    case 'V': return 'Checker'; break;
    case 'E': return 'Transcriber'; break;
    case 'VE': return 'Transcriber & Checker'; break;
    default: return '';break;
  }
}

function user_Is_Admin(&$controller, $uid) {
    $query = "  SELECT 
                    `role`
                FROM `user`
                WHERE `id` = '{$uid}'
                LIMIT 1
    ";
    $fetch = $controller->db->query($query);
    if($fetch->num_rows()){
        return $fetch->result_array()[0]['role'] === 'A' ? true : false;
    }
    return false;
} 

function current_date(String $format = "Y-m-d H:i:s") {
    return date($format);
}