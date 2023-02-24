"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: '{PATH} is required!'
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    posts: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Post' }
    ]
}, {
    timestamps: true
});
//# sourceMappingURL=UserSchema.js.map