<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
class QrGenerator extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        if (!class_exists('chillerlan\QRCode\QRCode')) {
            require 'C:\xampp\htdocs\DocTrackingSys\vendor\autoload.php';
        }
    }

    public function generateQR(string $student_info) {
        $text = $student_info;

        $result =Builder::create()
        ->writer(new PngWriter())
        ->writerOptions([])
        ->data($text)
        ->encoding(new Encoding('UTF-8'))
        ->errorCorrectionLevel(new ErrorCorrectionLevelHigh())
        ->size(300)
        ->margin(10)
        ->roundBlockSizeMode(new RoundBlockSizeModeMargin())
        ->logoPath('C:\xampp\htdocs\DocTrackingSys\assets\images\rtu-logo.png')
        ->logoResizeToWidth(100)
        ->logoPunchoutBackground(false)
        ->validateResult(false)
        ->build();
        
        // Generate a data URI to include image data inline (i.e. inside an <img> tag)
        $dataUri = $result->getDataUri();

        return $dataUri;
    }
}
 
?>