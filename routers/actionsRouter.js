const express = require('express');
const actions = require('../data/helpers/actionModel');
const project = require('../data/helpers/projectModel');
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
router.post('/:projectId', (req, res, next) => {
    const newAction = {
        descripton: req.body.description,
        notes: req.body.notes,
        completed: false
    }
    actions.insert(newAction)
    console.log(newAction)
    .then((action) => {
        res.status(201).json(action)
        next()
    })
    .catch((err) => {
         console.log(err)
         res.status(404).json({
             message: 'Unable to create new action'
         })
    })     
})

//UPDATE action
router.put('/:id', (req, res, next) => {
    actions.update(req.params.id, req.body)
     .then((action) => {
         console.log(action)
         res.status(200).json(action)
         next()
     })
     .catch((err) => {
         console.log(err)
         res.status(400).json({
             message: 'Unable to update post.',
         })
     })
})
//DELETE action
router.delete('/:id', (req, res, next) => {
    actions.remove(req.params.id)
    res.status(200).json({
        message: 'Action has been removed.',
    })
})

//Custom Middleware
function validateProjectId() {
    return (req, res, next) => {
        project.getProjectActions(req.params.projectId)
            .then((action) => {
                if(action) {
                    res.json(action)
                    next()
                } else {
                    res.status(404).json({
                        message: 'Project not found.',
                    })
                }
            })
            .catch((error) => {
                next(error)
          })
    }
}

//export router
module.exports = router;