const Transfer = require('../../../models/Transfer');

const getAll = (req, res) => {
    Transfer.find((err, docs) => {
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transfers": docs
                }
            });
        }
    });
}

const create = (req, res) => {
    let transfer = new Transfer();
    transfer.sender = req.user._id;
    transfer.recipient = req.body.recipient;
    transfer.amount = req.body.amount;
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