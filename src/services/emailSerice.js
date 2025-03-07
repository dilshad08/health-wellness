const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendEmail = async (email, subject, text, fileName, csvBuffer) => {
  try {
    let mailsOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html: text,
    };
    if (fileName && csvBuffer) {
      const attachments = [{ filename: fileName, content: csvBuffer }];
      mailsOptions = { ...mailsOptions, attachments };
    }
    await transporter.sendMail(mailsOptions);
    console.log(`Email sent to ${email} - Subject: ${subject}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    throw error;
  }
};
