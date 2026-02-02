const { model } = require('mongoose')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


const orderSuccessMail=async(toMail,order)=>{
try {
    const mailOption ={
        from:`my mail<${process.env.EMAIL_USER}>`,
        to:toMail,
        subject:'Order Placed Successfully',
        html:`<h2>Thanks For Order</h2>
        <p>your order has been placed successfully</p>
        <p><strong>${order.email}</strong></p>
        `
    }
} catch (error) {
    
}
}
