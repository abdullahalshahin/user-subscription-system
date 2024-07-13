const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    account_number: {
        type: String, required: true
    },
    currency: {
        type: String, required: true
    },
    amount: {
        type: Number, required: true
    },
    status: {
        type: String, required: true
    },
    transaction_id: {
        type: String, required: true
    },
    createdAt: {
        type: Date, default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
