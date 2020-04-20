const express = require('express');
const projects = require('../data/helpers/projectModel');
const router = express.Router();


//GET projects
router.get('/', (req, res, next) => {
    projects.get()
    .then((project) => {
        res.status(200).json(project)
        next()
    })
    .catch((error) => {
        console.log(error)
        res.status(404).json({
            message: 'projects not found'
        })
    })
})

//CREATE project
router.post('/', (req, res, next) => {
     if(!req.body.name || !req.body.description) {
       res.status(404).json({
           message: 'Please complete the missing fields.',
       })
   }   
    const newProject = {
       name: req.body.name,
       description: req.body.description,
       completed: false
   }

    projects.insert(newProject)
    res.status(201).json(newProject)
})


//UPDATE project
router.put('/:id', (req, res, next) => {
    projects.update(req.params.id, req.body)
     .then((updated) => {
       res.status(200).json(updated)
    })
     .catch((error) => {
         console.log(error)
         res.status(404).json({
             message: 'Unable to update the project.',
         })
    })
})  


//DELETE project
router.delete('/:id', (req, res,  next) => {
    projects.remove(req.params.id)
    .then((res) => {
      res.status(200).json({
      message: 'Project has been removed.',
    })
  })
  .catch((err) => {
      console.log(err)
      res.status(404).json({
          message: 'Unable to remove project.',
      })
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
module.exports = router;