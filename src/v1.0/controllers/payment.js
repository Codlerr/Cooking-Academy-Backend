const { addPayment } = require("../services/external/stripe/index");

const createPayment = async (req) => {
    const userId = "sk";
    let body = req?.body?.body;
    body = JSON.parse(body);
    const url = await addPayment(body?.items, userId);
    return { data: url };
};

module.exports = {
    createPayment,
};
