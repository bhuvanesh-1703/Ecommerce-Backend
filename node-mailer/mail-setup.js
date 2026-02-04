const nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config()

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS);

const transport = nodemailer.createTransport({
 
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});



const orderSuccessMail = async (req, res) => {
    try {
        const { toMail, order } = req.body;
        // console.log("Request body:", req.body);

        const mailOptions = {
            from: `Mail <${process.env.EMAIL_USER}>`,
            to: toMail,
            subject: 'Order Placed Successfully',
            html: `
               <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 450px; margin: 40px auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; border: 1px solid #eee;">
               <h2 style="color: #333; margin-top: 0; font-weight: 700;">Order Confirmed!</h2>
               <p style="color: #666; font-size: 16px; line-height: 1.5;">Your order has been placed successfully</p>
               <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: left;">
               <p style="margin: 0 0 10px 0; color: #555;"><strong>Email:</strong> <span style="color: #333;">${order.email}</span></p>
               <p style="margin: 0; color: #555;"><strong>Product:</strong> <span style="color: #333;">${order.productname}</span></p>
               </div>
               <h3 style="color: #888; font-weight: 400; font-size: 18px; margin-bottom: 25px;">Thank You for shopping with us!</h3>
            `,
        };

        const info = await transport.sendMail(mailOptions);
        // console.log("Mail sent:", info);

        res.status(200).json({ success: true, info });
    } catch (error) {
        console.error('Error sending order success email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { orderSuccessMail };
