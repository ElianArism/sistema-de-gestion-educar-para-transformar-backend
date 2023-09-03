import { Router } from "express"
import { login } from "./auth.controller"

const authRoutes = Router()

authRoutes.post("/login", [], login)
authRoutes.get("/renew-session", [])
authRoutes.post("/logout", [])

export default authRoutes
