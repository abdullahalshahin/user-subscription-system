const Response = async (req = null, data) => {
    const created_at = data.createdAt
        ? new Date(data.createdAt).toLocaleString()
        : null;

    return {
        id: data._id || null,
        account_number: data.account_number || null,
        currency: data.currency || null,
        amount: data.amount || null,
        status: data.status || null,
        transaction_id: data.transaction_id || null,
        created_at: created_at
    };
}

module.exports = {
    Response
}
