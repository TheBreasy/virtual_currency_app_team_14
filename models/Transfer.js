const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transferSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: String,
    message: String
});
const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;