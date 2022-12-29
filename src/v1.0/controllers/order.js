const messages = require("../../config/messages");
const { getCourseById, editCourseById } = require("../services/internal/course");
const { createOrder, getOrders, processOrders } = require("../services/internal/order");
const { createPayment } = require("../services/internal/payment");
const { makeQueryBuilder } = require("../services/internal/queryBuilder");
const { createSubscription, getSubscriptionCountByCourseId } = require("../services/internal/subscription");
const { ITEM_TYPE_COURSE, STATUS_COMPLETED } = require("../../config/constants");

const addOrder = async (req) => {
    const courseId = req.body.itemId;
    courseId.map(async (itemId) => {
        console.log(itemId);
        const course = await getCourseById(itemId);
        const subscriptionData = {
            userId: req?.user?._id,
            itemId: course._id,
            itemType: ITEM_TYPE_COURSE,
        };
        const orderItem = {
            itemId: course._id,
            itemType: ITEM_TYPE_COURSE,
            price: course.hasOffer ? course.offerPrice : course.price,
            itemName: course.name,
            amount: course.hasOffer ? course.offerPrice : course.price,
        };
        const orderData = {
            userId: req?.user?._id,
            amount: course.hasOffer ? course.offerPrice : course.price,
            status: STATUS_COMPLETED,
            items: [orderItem],
        };
        const order = await createOrder(orderData);
        const paymentData = {
            userId: req?.user?._id,
            orderId: order.orderId,
            amount: order.amount,
            status: STATUS_COMPLETED,
        };
        await Promise.all([createPayment(paymentData), createSubscription(subscriptionData)]);
        const subscriptionCount = await getSubscriptionCountByCourseId(itemId);
        await editCourseById(itemId, { subscriptionCount });
        return {
            message: messages?.orderAddedSuccess,
            data: order,
        };
    });
};

const viewOrders = async (req) => {
    const queryBuilder = makeQueryBuilder(req);
    const condition = { userId: req?.user?._id };
    let data = await getOrders(queryBuilder, condition);
    data.orders = await processOrders(data.orders);
    return {
        message: messages?.success,
        data,
    };
};

module.exports = {
    addOrder,
    viewOrders,
};
