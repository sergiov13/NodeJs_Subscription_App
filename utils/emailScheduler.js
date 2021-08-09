const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Subscription = require('../models/subscription.model');
require('dotenv').config();

function EmailScheduler() {
    
    const endDate = (date, months) => {
        var d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    }

    const expirationWarning = (sub, days) => {
        var email = false;
        var today = new Date();
        var enddate = endDate(sub.startDate, sub.durationMonths);
        
        enddate.setDate(enddate.getDate() - days)
        
        if (today.toISOString().substring(0,10) === enddate.toISOString().substring(0,10)){
            email = true;
        }
        return email;
    }

    const activationNotification = (sub, days) => {
        var email = false;
        var today = new Date();
        var startDate = new Date(sub.startDate);
        
        startDate.setDate(startDate.getDate() + days)
       
        if (today.toISOString().substring(0,10) === startDate.toISOString().substring(0,10)){
            email = true;
        }
        return email;
    }

    //Fetch list daily at 1 am from DB 
    cron.schedule(" * * 1* * * *", () => {
        Subscription.find()
        .then(subs => checkEmailSchedule(subs))
        .catch(err => console.log('Error: ' + err))        
    }, {
        scheduled: true,
        timezone: "America/Argentina/Buenos_Aires"
    })
    
    const warningEmail = (emailAddress) => ({
        from: 'web@gmail.com',
        to: emailAddress,
        subject:"WARNING: Subscription about to expire",
        text: "Your subscription is about to end"
    });

    const notificationEmail = (emailAddress) => ({
        from: 'web@gmail.com',
        to: emailAddress,
        subject:"NOTIFICATION: Subscription active",
        text: "Your subscription is online"
    });
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const emailHandling = (emailType) => {
        transporter.sendEmail(emailType, (error, info) => {
            if (error) {
                console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
       });
    }

    
    function checkEmailSchedule(subscriptions) {
        subscriptions.map((item) => {
            if (item.productName === "domain" && expirationWarning(item, 2) ){
                console.log(item.productName + ' ');
                emailHandling(warningEmail(item.domain));
            } 
            if (item.productName === "pDomain" && expirationWarning(item, 9) || expirationWarning(item, 2)){
                console.log(item.productName + ' ');
                emailHandling(warningEmail(item.domain));
            }
            if (item.productName === "hosting" && activationNotification(item, 1) || expirationWarning(item, 3)){
                console.log(item.productName + ' ');
                activationNotification(item,1) ? emailHandling(notificationEmail(item.domain)) : emailHandling(warningEmail(item.domain));
            }   
        })
    }    
}

module.exports = EmailScheduler;