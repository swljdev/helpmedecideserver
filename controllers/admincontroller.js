const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user')
const Poll = sequelize.import('../models/poll')
const Response = sequelize.import('../models/response')

const jwt = require('jsonwebtoken');


router.post('/', function (req, res) {
    console.log(req)
    const token = req.body.token;
    let userId = jwt.decode(token, process.env.JWT_SECRET);
    userId = userId.id;
    
    User.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        console.log(user)
        Poll.findAll({
            where: {
                userId: userId
            }
        }).then(poll => {
            console.log(poll)
            Response.findAll({
                where: {
                    userId: userId
                }
            }).then(response => {
                let userArray = []
                userArray.push(user),
                userArray.push(poll),
                userArray.push(response)
                res.send(userArray)
            }).catch(err => res.status(500).json ({
                error: err
        }))
        }).catch(err => res.status(500).json ({
            error: err
    }))
    }
    ).catch(err => res.status(500).json ({
        error: err
}))
        }
    );

module.exports = router;