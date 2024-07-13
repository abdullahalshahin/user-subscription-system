const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, minlength: 3, maxlength: 150, required: true
    },
    email: {
        type: String, minlength: 3, maxlength: 150, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    security: {
        type: String, required: true
    },
    isActive: {
        type: Boolean, default: false
    },
    loginAttempts: {
        type: Number, default: 0
    },
    lockUntil: {
        type: Date, default: null
    },
    expires_at: {
        type: Date, default: null
    },
    created_at: {
        type: Date, default: Date.now
    },
    deleted_at: {
        type: Date, default: null
    }
});

userSchema.methods.incrementLoginAttempts = async function () {
    if (this.lockUntil && this.lockUntil > Date.now()) {
        return;
    }

    this.loginAttempts += 1;

    if (this.loginAttempts >= 3) {
        this.lockUntil = new Date(Date.now() + 5 * 60 * 1000);
        this.loginAttempts = 0;
    }

    await this.save();
};

userSchema.methods.resetLoginAttempts = async function () {
    this.loginAttempts = 0;
    this.lockUntil = null;
    
    await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
