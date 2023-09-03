import { Router } from "express"
import authRoutes from "./modules/auth/auth.routes"
import commentRoutes from "./modules/comment/comment.routes"
import userRoutes from "./modules/user/user.routes"

const AppRouter = Router()

AppRouter.use("/auth", authRoutes)
AppRouter.use("/users", userRoutes)
AppRouter.use("/comment", commentRoutes)

export default AppRouter
