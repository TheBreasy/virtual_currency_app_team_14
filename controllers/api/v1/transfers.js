const Transfer = require('../../../models/Transfer');
const User = require('../../../models/User');

const getAll = (req, res) => {
    Transfer.find((err, docs) => {
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transfers": docs
                },
                "user": {
                    "nickname": req.user.nickname
                }
            });
        }
    });
}

const create = (req, res) => {
    let senderUsername = req.user.nickname;
    let transfer = new Transfer();
    transfer.sender = senderUsername;
    transfer.recipient = req.body.recipient;
    transfer.amount = req.body.amount;
    transfer.reason = req.body.reason;
    transfer.message = req.body.message;
    transfer.save((err, doc) => {
        if(err) {
            res.json({
                "status": "error",
                "message": "Could not save this transfer"
            });
        }
       if(!err) {
           res.json({
               "status": "success",
               "data": {
                   "transfer": doc
               }
           });
       }
    });
}

module.exports.getAll = getAll;
module.exports.create = create;