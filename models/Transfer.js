const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransferSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required:true
    },
    message: {
        type: String,
    },
    amount: {
        type: String,
        required: true
    }
});
const Transfer = mongoose.model('Transfer', TransferSchema);

module.exports = Transfer;