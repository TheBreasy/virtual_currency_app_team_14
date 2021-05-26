const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    let username = req.body.username; // UI of postman
    let password = req.body.password;
    let nickname = req.body.nickname;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let coins = 100;

    if(username.includes("@student.thomasmore.be")) {
        const user = new User({
            username: username,
            nickname: nickname,
            firstname: firstname,
            lastname: lastname,
            coins: coins
        });

        await user.setPassword(password);
        await user.save().then(result => {
            console.log(result._id);

            let token = jwt.sign({
                uid: result._id,
                nickname: result.nickname,
                username: result.username,
                firstname: result.firstname,
                lastname: result.lastname
            }, "MyVerySecretWord");

            res.json({
                "status": "success",
                "data": {
                    "token": token
                }
            })
        }).catch(error => {
            res.json({
                "status": "error"
            })
        });
    } else {
        throw "email must include @student.thomasmore.be";
    }

};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        if(!result.user) {
            return res.json({
                "status": "failed",
                "message": "Login failed"
            });
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username,
        }, "MyVerySecretWord");
        return res.json({
            "status": "success",
            "data": {
                "token": token,
                "id": result.user._id,
            }
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};

module.exports.signup = signup;
module.exports.login = login;