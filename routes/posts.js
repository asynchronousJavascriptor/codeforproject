const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    username: String,
    data: String,
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("post", postSchema);