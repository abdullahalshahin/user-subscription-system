const sendEmail = require('./../../Utils/SendEmail');
const User = require('./../../Models/User');

const index = async (req, res, next) => {
    try {
        
        return res.status(200).json({
            status: 'success',
            message: 'Welcome!!!'
        });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    index
}
