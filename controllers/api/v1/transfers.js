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

const create = async (req, res) => {
    let senderUsername = req.user.nickname;
    let transfer = new Transfer();
    transfer.sender = senderUsername;
    transfer.recipient = req.body.recipient;
    transfer.amount = req.body.amount;
    transfer.reason = req.body.reason;
    transfer.message = req.body.message;

    let getRecipientByNickname = await User.findOne({nickname: req.body.recipient});
    let recipientUsername = getRecipientByNickname['nickname'];
    let senderCoins = req.user.coins;
    let recipientCoins = getRecipientByNickname.coins;

    if(req.user.coins>=req.body.amount) {
        updateCoins(recipientUsername, recipientCoins+req.body.amount);
        updateCoins(senderUsername, senderCoins-req.body.amount);

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
                        "transfers": doc
                    }
                });
            }
        })
    } else {
        return res.json({
            "status": "error",
            "message": "You don't have enough coins"
        })
    }
}

const updateCoins = (nickname, amount) => {
    User.findOneAndUpdate({"nickname": nickname}, {$set: {"coins": amount}}, {returnNewDocument: true, useFindAndModify: false}, (err, docs) => {})
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