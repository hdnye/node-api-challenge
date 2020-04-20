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
router.post('/:projectId', validateProjectId(), (req, res, next) => {
    const newAction = {
        project_id: req.params.project_id,
        descripton: req.body.description,
        notes: req.body.notes 
       }
    actions.insert(newAction)
    console.log(newAction)
    .then((action) => {
        res.status(201).json(action)
        next()
    })
    .catch(err => console.log(err))
})

//UPDATE action
router.put('/:id', (req, res, next) => {
    actions.update(req.params.id, req.body)
     .then((action) => {
         console.log(action)
         res.status(200).json(action)
     })
     .catch((err) => {
         console.log(err)
         res.status(400).json({
             message: 'Unable to update post.',
         })
     })
})
//DELETE action

//Custom Middleware
function validateProjectId() {
    return async(req, res, next) => {
        try {
            const project = await projects.getProjectActions(req.params.id)
            if(project) {
                req.project = project
                next()
            } else {
                res.status(404).json({
                    message: 'Could not find project'
                })
            }
        } catch(err) {
            next(err)
        }
    }
}

//export router
module.exports = router;