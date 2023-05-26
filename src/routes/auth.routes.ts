import { Router } from "express"
import { generateToken, loginUser } from "../controllers/auth.controller"

const router = Router()

router.post('/api/v1/users/login', loginUser)
router.post('/api/v1/users/token', generateToken)

export default router