const Transfer = require('../../../models/Transfer');

const getAll = (req, res) => {
    Transfer.find({
        "sender": "Yonas"
    },  (err, docs) =>{
        if (!err){
            res.json({
                "status": "success",
                "data": {
                    "todos": docs
                }
            });
        }
    })
}

const create = (req, res) => {
    let transfer = new Transfer();
    transfer.sender = req.body.sender;
    transfer.recipient = req.body.recipient;
    transfer.message = req.body.message;
    transfer.amount = req.body.amount;
    transfer.save((err, doc)=>{
        if (err){
            res.json({
                "status": "error",
                "message": "Could not transfer"
            });
        }

        if(!err){
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