const nodemailer = require('nodemailer');

// Solo configurar email si las credenciales están disponibles
let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verificar conexión solo si está configurado
  transporter.verify((error, success) => {
    if (error) {
      console.log('Error en la configuración del email:', error);
    } else {
      console.log('Servidor de email listo para enviar mensajes');
    }
  });
} else {
  console.log('Configuración de email no encontrada - funcionalidad de email deshabilitada');
}

module.exports = transporter;
