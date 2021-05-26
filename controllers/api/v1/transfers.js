const Transfer = require('../../../models/Transfer');
const User = require('../../../models/User');

const getAllByNickname = (req, res) => {
    Transfer.find({$or:[{"sender": req.user.nickname}, {"recipient": req.user.nickname}]}, (err, docs) => {
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

const getTransferById = (req, res) => {
    let id = req.params.id;
    Transfer.findById(id, (err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": "Couldn't get transfer by id"
            })
        }
        if(!err) {
            res.json({
                "status": "success",
                "transfer": docs
            })
        }
    });
}

module.exports.getAllByNickname = getAllByNickname;
module.exports.create = create
module.exports.getTransferById = getTransferById;