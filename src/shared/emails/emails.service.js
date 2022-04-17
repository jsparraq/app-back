const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PASSWORD } = require("../../config/envVars");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

class EmailService {
  static async send(email, message, subject = "Email sended by Dinner app") {
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}

module.exports = EmailService;
