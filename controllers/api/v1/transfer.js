const Transfer = require('../../../models/Transfer');

const getAll = (req, res) => {
    Transfer.find((err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": "Couldn't get all transfers"
            })
        }
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transfers": docs
                }
            })
        }
    })
}
module.exports.getAll= getAll;