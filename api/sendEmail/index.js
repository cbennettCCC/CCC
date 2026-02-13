// JavaScript source code
const nodemailer = require("nodemailer");

module.exports = async function (context, req) {
    const { firstName, lastName, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: "cbennett@conleycc.com",
            pass: process.env.M365_PASSWORD
        }
    });

    const mailOptions = {
        from: "cbennett@conleycc.com",
        to: "info@conleycc.com",
        subject: "New Contact Form Submission",
        text: `
New contact request:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        context.res = { body: "Your request has been submitted successfully." };
    } catch (err) {
        context.log(err); // still logs if Azure ever shows logs
        context.res = {
            status: 500,
            body: `Error: ${err.message}`
        };


    }
};