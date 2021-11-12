Email.send({
    SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
    To : '@email.com',
    From : "AltifyHosting@isp.com",
    Subject : "Thanks for using us!",
    Body : "Thanks for using the Altify bot service"
}).then(
  message => alert(message)
);
<script src="https://smtpjs.com/v3/smtp.js"></script>
