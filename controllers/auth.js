const User = require('../models/User');
// const Passport = require('../passport/passport');

const signup = async (req, res, next) => {
    console.log();
    let username = req.body.username;
    let password = req.body.password;

    const user = new User({username: username});
    await user.setPassword(password);
    await user.save().then(result => {
        res.json({
            "status": "success"
        })
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

module.exports.signup = signup;