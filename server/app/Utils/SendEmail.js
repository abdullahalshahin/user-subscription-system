const nodemailer = require('nodemailer');
const app_config = require('./../../config/app');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: app_config.mail.username,
        pass: app_config.mail.password
    }
});

const sendEmail = (to, subject, text) => {
    if (!to) {
        console.log('No recipients defined');
        return;
    }

    const mailOptions = {
        from: app_config.mail.username,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
