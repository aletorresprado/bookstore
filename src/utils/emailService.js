const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});


// Function verification email
const sendVerificationEmail = async (email, username, userCode) => {
    const mailOptions = {
        from: `"BOOKSTORE" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verifica tu cuenta - BOOKSTORE 📚',
        html: `
            <h1>Email Verification</h1> 
            <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #F4F4F4;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              color: #4CAF50;
              text-align: center;
              padding: 20px;
              background-color: #F0F0F0;
              border-radius: 5px;
              letter-spacing: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h2>¡Bienvenido/a ${username}!</h2>
              <p>Gracias por registrarte en nuestra Tienda de Libros.</p>
              <p>Para completar tu registro, por favor verifica tu cuenta usando el siguiente código:</p>
              <div class="code">${userCode}</div>
              <p><strong>Este código expira en 15 minutos.</strong></p>
              <p>Si no solicitaste este registro, puedes ignorar este email.</p>
            </div>
            <div class="footer">
              <p>© 2025 Tienda de Libros / BOOKSTORE 📚. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
        `};
        try{
            await transporter.sendMail(mailOptions);
            console.log('✅ Verificacion de email enviado a:', email);
            return true;

        }catch(error){
            console.error('⛔ Error al enviar verificacion email:', error);
            throw new Error('Error al enviar el email de verificación');
        }
    };    

module.exports = {
    sendVerificationEmail,
};