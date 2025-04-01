require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tucorreo', //Tu cuenta de gmail
    pass: 'tucontraseña' //Aqui va la contraseña que generamos en el paso anterior de gmail
  }
});

let transporter2 = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    type: 'custom',
    user: process.env.USER,
    pass: process.env.PASS
  },
});

const mailOptions = {
  from: 'nodemailer@marcossoluciones.com', //tu cuenta de gmail
  to: 'mneo666@gmail.com', //Un ejemplo de correo al que quieres que llegue tu email
  subject: 'Reserva Registrada', //Cabecera
  html: `
  
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #0073e6;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
        }
            a.button{color:#ffffff !important;}
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px;
            text-align: center;
            background: #0073e6;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Reserva registrada</h2>
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Thank you for signing up for our service. We are excited to have you on board.</p>
            <p>Click the button below to confirm your email address:</p>
            <a href="#" class="button">Confirm Email</a>
            <p>If you did not sign up, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 TaxiTravel. All rights reserved.</p>
        </div>
    </div>
</body>
</html>


  `
};

app.get("/", (req, res) => {
  res.send("<h1>Nodemailer</h1><br><a href='/send'>Enviar mensaje</a>");
});


app.get("/send", (req, res) => {

  console.info('Enviando correo ...')
  transporter2.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Enviado! ' + info.response);

    }
  });

  res.send("<h1>Nodemailer</h1>");
});

app.listen(3000, () => {
  console.log("server on!");
})