const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        username: { type: String },
        avatar: { type: String },
        full_name: { type: String },
        status: { type: Number, default: 1 },
        rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
        friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        friend_pending: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        is_active: { type: Boolean, default: true },
        googleId: {type: String}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);
