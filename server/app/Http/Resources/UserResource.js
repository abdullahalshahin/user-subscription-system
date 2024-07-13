const Response = async (req = null, data) => {
    const base_url = req.protocol + '://' + req.get('host');

    const created_at = data.created_at
        ? new Date(data.created_at).toLocaleString()
        : null;

    const expires_at = data.expires_at
        ? new Date(data.expires_at).toLocaleString()
        : null;

    return {
        id: data._id || null,
        name: data.name || null,
        email: data.email || null,
        password: data.security || null,
        is_active: (data.isActive) ?  true : false,
        expires_at: expires_at,
        created_at: created_at
    };
}

module.exports = {
    Response
}
