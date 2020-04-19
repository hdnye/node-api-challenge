const express = require('express');
const projects = require('../data/helpers/projectModel');
const router = express.Router();


//GET projects
router.get('/', (req, res, next) => {
    projects.get()
    .then((action) => {
        res.status(200).json(action)
        next()
    })
    .catch((error) => {
        console.log(error)
        res.status(404).json({
            message: 'projects not found'
        })
    })
})

//CREATE projects wtih project_id

//UPDATE action

//DELETE action

//Custom Middleware

module.exports = router;