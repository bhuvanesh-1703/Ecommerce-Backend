const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const registerSuccessMail = async (req, res) => {
  try {
    const { toMail, register } = req.body;   // ✅ use "register"

    console.log("Request body:", req.body);

    if (!toMail || !register?.email) {
      return res.status(400).json({ success: false, error: "Missing recipient or email" });
    }

    const mailOptions = {
      from: `Decon Ecommerce <${process.env.EMAIL_USER}>`,
      to: toMail,
      subject: 'Registration Successful',
      text: `Registration successful!\nEmail: ${register.email}\nThank you for shopping with us!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 450px; margin: 40px auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; border: 1px solid #eee;">
          <h2 style="color: #333; margin-top: 0; font-weight: 700;">Registration Success!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">You have registered successfully.</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: left;">
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Email:</strong> <span style="color: #333;">${register.email}</span></p>
          </div>
          <h3 style="color: #888; font-weight: 400; font-size: 18px; margin-bottom: 25px;">Thank you for shopping with us!</h3>
        </div>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Mail sent:", info);

    res.status(200).json({ success: true, info });
  } catch (error) {
    console.error('Error sending register success email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { registerSuccessMail };
