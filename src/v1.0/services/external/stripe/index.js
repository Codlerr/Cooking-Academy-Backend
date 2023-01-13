const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { getCourseById } = require("../../internal/course");

const addPayment = async (data, userId) => {
    try {
        const courses = new Map();
        await Promise.all(
            data.map(async (item) => {
                const course = await getCourseById(item.id);
                courses.set(item.id, course);
            })
        );
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: data.map((item) => {
                const storeItem = courses.get(item.id);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            images: [storeItem.image],
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.price * 100,
                    },
                    quantity: 1,
                };
            }),
            success_url: `${
                process.env.APP_DOMAIN
            }/success?session_id={CHECKOUT_SESSION_ID}$uid=${userId}$order=${JSON.stringify(data)}`,
            cancel_url: "http://localhost:3000/cart",
        });
        return { url: session.url };
    } catch (err) {
        console.log(err.message);
        return { error: err.message };
    }
};
module.exports = { addPayment };
