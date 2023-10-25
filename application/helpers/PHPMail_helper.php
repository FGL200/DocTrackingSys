<?php

if(!function_exists('_sendPhpMailer')){
    function _sendPhpMailer($email,$subject = 'Annountment',$cc = null,$body){
        $CI =& get_instance();
      
        $CI->load->library('phpmailer_lib');
    
        // PHPMailer object
        $mail = $CI->phpmailer_lib->load();
        // $mail->SMTPDebug = 3;                               
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host     = 'smtp.gmail.com';   
        $mail->SMTPAuth = true;
        $mail->Username = '2020-100627@rtu.edu.ph';
        $mail->Password = 'ceux syck kszy xcvi'; # create here https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4N3Ucs5jEph3Jsr49Anyj_GTq2DJCMP_Z5del3rXoqDdl8B0JgtCjiGBRVZGwJQNXae35bVh976JwH5z3Q8kRDZGPfupg
        $mail->SMTPSecure = 'tls';
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 587;   
        
        $mail->setFrom('2020-100627@rtu.edu.ph', 'Sender Name');
        $mail->addReplyTo('2020-100627@rtu.edu.ph', 'Reply receiver Name');
        
        // Add a recipient
        $mail->addAddress($email);
        
        // Add cc or bcc 
        if($cc != null ){
            $mail->addCC($cc);
        }
        // $mail->addBCC('bcc@example.com');
        
        // Email subject
        $mail->Subject = $subject;
        
        // Set email format to HTML
        $mail->isHTML(true);
        
        // Email body content
        $mail->Body = $body;
        
        // Send email
        if(!$mail->send()){
            $result['msg'] =  'Message could not be sent.  | Mailer Error: ' . $mail->ErrorInfo;
            $result['error'] = 0;
        }else{
           $result['msg'] = 'Message has been sent';
           $result['error'] = 1;
        }
      
       return $result;
    }
}