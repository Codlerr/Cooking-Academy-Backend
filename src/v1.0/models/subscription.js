module.exports = (mongoose, collectionName) => {
    const schema = mongoose.Schema(
        {
            userId: {
                type: String,
                required: true,
            },
            itemId: {
                type: String,
                required: true,
            },
            startsAt: {
                type: Date,
            },
            endsAt: {
                type: Date,
            },
        },
        {
            timestamps: true,
        }
    );

    return mongoose.model("Subscription", schema, collectionName);
};
