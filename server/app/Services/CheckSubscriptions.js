const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('./../Models/User');
const sendEmail = require('./../Utils/SendEmail');

const checkSubscriptions = async () => {
    try {
        const now = new Date();
        const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    
        // Find users expiring in 2 days
        const expiring_users = await User.find({
            expiresAt: { $lte: twoDaysFromNow, $gte: now },
            status: 'active'
        }).populate('user');
  
        expiring_users.forEach(async (user) => {
            if (user && user.email) {
                const subject = 'Your subscription is about to expire';
                const text = `Hi ${user.username},\n\nYour subscription is set to expire on ${user.expiresAt}. Please renew your subscription to continue enjoying our services.\n\nThank you!`;
                
                sendEmail(user.email, subject, text);
        
                console.log(`Alert email sent to ${user.email}`);
            }
        });
  
        // Find subscriptions that have expired
        const expired_users = await User.find({
            expiresAt: { $lte: now },
            status: 'active'
        });
  
        expired_users.forEach(async (user) => {
            if (user) {
                user.status = 'inactive';
                await user.save();
        
                user.isActive = false;
                await user.save();
        
                console.log(`User ${user.email} has been deactivated`);
            }
        });
    } catch (err) {
      console.error('Error checking subscriptions: ', err);
    }
};
  
// Schedule the task to run once a day at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running subscription check...');
    checkSubscriptions();
});
