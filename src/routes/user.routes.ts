import { Router } from "express"
import { createUser, getUsers, updateUser, deleteUser, getUser } from "../controllers/user.controller"


const router = Router()


router.post('/api/v1/users', createUser)
router.get('/api/v1/users', getUsers)
router.get('/api/v1/users/:id', getUser)
router.put('/api/v1/users/:id', updateUser)
router.delete('/api/v1/users/:id', deleteUser)

export default router