"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.address = void 0;
const mongoose = require('mongoose');
exports.address = {
    name: {
        type: String,
        required: '{PATH} is required!'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
};
//# sourceMappingURL=addreses.js.map