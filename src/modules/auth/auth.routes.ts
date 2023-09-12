import { Router } from "express"
import { validateJWT } from "../../middlewares/validate-jwt.middleware"
import { login, profile } from "./auth.controller"

const authRoutes = Router()

authRoutes.post("/login", [], login)
authRoutes.get("/renew-session", [])
authRoutes.get("/profile", [validateJWT], profile)
authRoutes.post("/logout", [])

export default authRoutes
