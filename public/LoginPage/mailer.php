<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '\vendor\phpmailer\phpmailer\src\Exception.php';
require __DIR__ . '\vendor\phpmailer\phpmailer\src\PHPMailer.php';
require __DIR__ . '\vendor\phpmailer\phpmailer\src\SMTP.php';

require __DIR__ . '/vendor/autoload.php'; // Adjust the path as necessary

$mail = new PHPMailer(true); // Create a new PHPMailer instance

// $mail -> SMTPDebug = SMTP::DEBUG_SERVER; // Enable verbose debug output

$mail->isSMTP(); // Set mailer to use SMTP
$mail-> SMTPAuth = true; // Enable SMTP authentication

$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587; // TCP port to connect to
$mail->Username = 'stickmanodyssey@gmail.com';
$mail->Password = 'gmpu jklo kmrc yzag';
$mail->isHTML(true); // Set email format to HTML

return $mail; // Return the PHPMailer instance for further use
?>