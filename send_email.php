<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    if (!$email) {
        echo "Invalid email address.";
        exit;
    }

    // Receiver email (Change this to your email)
    $to = "ojathar23computer@student.mes.ac.in";  

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email content
    $fullMessage = "Name: $name\n";
    $fullMessage .= "Email: $email\n";
    $fullMessage .= "Subject: $subject\n\n";
    $fullMessage .= "Message:\n$message\n";

    // Send email
    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "An error occurred while sending the email.";
    }
} else {
    echo "Invalid request.";
}
?>
