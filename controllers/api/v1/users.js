const User = require('../../../models/User');

const getAll = (req, res) => {
    User.find((err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": err
            })
        }
        if(!err) {
            res.json({
                "status": "success",
                "users": docs
            })
        }
    } );
}

const getUserById = (req, res) => {
    let id = req.params.id;

    User.findById(id, (err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": err
            })
        }
        if(!err) {
            res.json({
                "status": "success",
                "id": id,
                "username": docs.username,
                "nickname": docs.nickname,
                "firstname": docs.firstname,
                "lastname": docs.lastname,
                "coins": docs.coins
            })
        }
    })
}

module.exports.getAll = getAll;
module.exports.getUserById = getUserById;