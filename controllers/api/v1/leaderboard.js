const User = require('../../../models/User');
const getCoinsFromUsers = (req, res) => {
    let sortByCoins = {coins : 'descending'};
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
    } ).sort(sortByCoins);
}

module.exports.getCoinsFromUsers = getCoinsFromUsers;