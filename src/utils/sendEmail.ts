import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY as string,
  domain: 'sandbox70faae22935144f197721b8d197c6e14.mailgun.org',
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'miknignod@gmail.com',
    to: 'miknignod@gmail.com',
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verificatoin/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
