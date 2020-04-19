const express = require('express');
const actions = require('../data/helpers/actionModel');
const router = express.Router();


//GET actions
router.get('/', (req, res, next) => {
    actions.get()
    .then((action) => {
        res.status(200).json(action)
        next()
    })
    .catch((error) => {
        console.log(error)
        res.status(404).json({
            message: 'Actions not found'
        })
    })
})

//CREATE actions wtih project_id

//UPDATE action

//DELETE action

//Custom Middleware

module.exports = router;