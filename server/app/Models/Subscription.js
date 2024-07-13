const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    stripeSubscriptionId: {
        type: String, required: true
    },
    status: {
        type: String, required: true, default: 'inactive'
    },
    expiresAt: {
        type: Date, required: true
    }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
