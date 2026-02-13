const nodemailer = require("nodemailer");

module.exports = async function (context, req) {
    try {
        const { firstName, lastName, email, phone, message } = req.body || {};

        // Debug: show incoming request
        if (!req.body) {
            throw new Error("Request body is empty. The function did not receive JSON.");
        }

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
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
            `
        };

        await transporter.sendMail(mailOptions);

        context.res = {
            status: 200,
            body: "Email sent successfully."
        };

    } catch (err) {
        context.res = {
            status: 500,
            body: `DEBUG ERROR:\n${err.stack || err.message || err}`
        };
    }
};