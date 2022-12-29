module.exports = (mongoose, collectionName) => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                sparse: true,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            createdBy: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                default: "",
            },
            videoLink: {
                type: String,
                default: "",
            },
            instructorName: {
                type: String,
                default: "",
            },
            about: {
                type: String,
                default: "",
            },
            unit: {
                type: Number,
                default: "",
            },
            lesson: {
                type: Number,
                default: "",
            },
            task: {
                type: Number,
                default: "",
            },
            price: {
                type: Number,
                required: true,
            },
            reviewCount: {
                type: Number,
                default: 0,
            },
            likeCount: {
                type: Number,
                default: 0,
            },
            dislikeCount: {
                type: Number,
                default: 0,
            },
            avgRating: {
                type: Number,
                default: 0,
            },
            subscriptionCount: {
                type: Number,
                default: 0,
            },
        },
        {
            timestamps: true,
        }
    );

    schema.index({ name: "text", mode: "text" });
    return mongoose.model("Course", schema, collectionName);
};
