<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PhpMailController extends CI_Controller{
    
    function  __construct(){
        parent::__construct();
    }

    function sendMail() {
        _sendPhpMailer("patrickjabonillo.26@gmail.com", "TRY LANG", null, "HELLO");
    }
    
    function send(){
        // Load PHPMailer library
        $this->load->library('phpmailer_lib');
    
        // PHPMailer object
        $mail = $this->phpmailer_lib->load();
        $mail->SMTPDebug = 3;                               
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host     = 'smtp.gmail.com';   
        $mail->SMTPAuth = true;
        $mail->Username = 'benjaminbritanico@gmail.com';
        $mail->Password = 'bdpr brbk wdga yrew'; # create here https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4N3Ucs5jEph3Jsr49Anyj_GTq2DJCMP_Z5del3rXoqDdl8B0JgtCjiGBRVZGwJQNXae35bVh976JwH5z3Q8kRDZGPfupg
        $mail->SMTPSecure = 'tls';
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 587;   
        
        $mail->setFrom('eadriano.it@gmail.com', 'Lapaz National High School');
        $mail->addReplyTo('eadriano.it@gmail.com', 'LNHS');
        
        // Add a recipient
        $mail->addAddress('ericksonadriano.h2software@gmail.com');
        
        // Add cc or bcc 
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');
        
        // Email subject
        $mail->Subject = 'Send Email via SMTP using PHPMailer in CodeIgniter';
        
        // Set email format to HTML
        $mail->isHTML(true);
        
        // Email body content
        $mailContent = "<h1>Send HTML Email using SMTP in CodeIgniter</h1>
            <p>This is a test email sending using SMTP mail server with PHPMailer.</p>";
        $mail->Body = $mailContent;
        
        // Send email
        if(!$mail->send()){
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        }else{
            echo 'Message has been sent';
        }
    }
    
    
}