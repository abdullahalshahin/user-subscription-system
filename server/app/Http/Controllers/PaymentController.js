const joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const PaymentModel = require('./../../Models/Payment');
const PaymentResource = require('./../Resources/PaymentResource');

const index = async (req, res, next) => {
    try {
        const AuthUser = req.AuthUser;

        const payment_history = await PaymentModel.find({ user: AuthUser._id });

        const payments = await Promise.all(payment_history.map(async (payment) => {
            return PaymentResource.Response(req, payment)
        }));
        
        return res.status(200).json({
            status: 'success',
            message: 'Welcome!!!',
            payment_history: payments
        });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

const store = async (req, res, next) => {
    try {
        const schema = joi.object({
            account_number: joi.string().max(150).required(),
            currency: joi.string().max(150).required(),
            amount: joi.number().max(150).required(),
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!',
                errors: error.details.map(err => err.message)
            });
        }

        const { account_number, currency, amount } = value;

        const user = req.AuthUser;

        const newPayment = new PaymentModel({
            user: user._id,
            account_number: account_number,
            currency: currency,
            amount: amount,
            status: "success",
            transaction_id: uuidv4()
        });

        await newPayment.save();

        user.isActive = true;
        const currentDate = new Date();
        const expiresAt = new Date(currentDate.setDate(currentDate.getDate() + 30));
        user.expires_at = expiresAt;

        await user.save();
        
        return res.status(200).json({
            status: 'success',
            message: 'Payment Successfull...',
            payment: newPayment
        });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    index,
    store
}
