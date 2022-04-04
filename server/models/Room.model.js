const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        name: {type: String},
        owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        avatar: {type: String},
        is_active: {type: Boolean, default: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Room", roomSchema);