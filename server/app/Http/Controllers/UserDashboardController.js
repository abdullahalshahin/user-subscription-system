const index = async (req, res, next) => {
    try {
        const user = req.AuthUser;

        return res.status(200).json({
            status: 'success',
            message: "dashboard",
            result: {
                is_active: user.isActive,
                expires_at: (user.expires_at) ? new Date(user.expires_at).toLocaleString() : null
            }
        });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    index
}
