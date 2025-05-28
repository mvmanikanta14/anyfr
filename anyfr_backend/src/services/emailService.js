const nodemailer = require('nodemailer');
const { getConfig } = require('../config/config');


class EmailService {
    constructor() {
        const mail = getConfig().mail
        this.transporter = nodemailer.createTransport({
            host: "",
            port: "",
            secure: true,
            auth: {
                user: mail.user,
                pass: mail.pass
            }
        });
    }

    async sendEmail(to, subject, body) {
        return this.transporter.sendMail({
            from: "",
            to,
            subject,
            html: body
        });
    }
}

module.exports = EmailService;