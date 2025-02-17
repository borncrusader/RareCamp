import express from 'express'
import taskRouter from './task'
import wrapAsync from '../wrap-async'
import {
  createProject,
  getProject,
  updateProject,
  getProjects,
} from '../../../controllers/project'

const projectRouter = express.Router({ mergeParams: true })

projectRouter.post('/', wrapAsync(async (req, res) => {
  const { project } = req.body
  const { userId } = req.cognitoUser
  const { programId } = req.params
  const projectItem = await createProject({ programId, project, userId })

  res.json({ project: projectItem })
}))

projectRouter.put('/:projectId', wrapAsync(async (req, res) => {
  const { userId } = req.cognitoUser
  const { projectId, programId } = req.params
  const { project } = req.body
  const projectItem = await updateProject({
    userId, programId, projectId, project,
  })

  res.json({ project: projectItem })
}))

projectRouter.get('/', wrapAsync(async (req, res) => {
  const { userId } = req.cognitoUser
  const { programId } = req.params
  const projects = await getProjects({ userId, programId })
  res.json({ projects })
}))

projectRouter.get('/:projectId', wrapAsync(async (req, res) => {
  const { userId } = req.cognitoUser
  const { projectId, programId } = req.params
  const project = await getProject({ userId, programId, projectId })

  if (!project) {
    return res
      .status(404)
      .json({})
  }

  return res.json({ project })
}))

// task routes
projectRouter.use('/:projectId/tasks', taskRouter)

export default projectRouter
