// const nodemailer = require('nodemailer');

// const sendEmail = async (to, subject, text) => {
//   try {
//     // Configure the email transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // Use your email service provider
//       auth: {
//         user: process.env.EMAIL_USER, // Use environment variable for email
//         pass: process.env.EMAIL_PASS, // Use environment variable for password
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // Use environment variable for email
//       to,
//       subject,
//       text,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error(`Error sending email: ${error.message}`);
//     throw new Error('Failed to send email');
//   }
// };

require('dotenv').config(); 
const mailjet = require('node-mailjet').apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

const sendEmail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {Email : 'alaa.benabada@gmail.com',
              Name: 'KnowQuest',
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            TextPart: text, 
            HTMLPart: `<h3>${text}</h3>`,
          },
        ],
      });

    request
      .then((result) => {
        console.log('Email sent successfully:', result.body);
        resolve(result.body);
      })
      .catch((err) => {
        console.error('Error sending email:', err);
        reject(err);
      });
  });
};

module.exports = sendEmail;
