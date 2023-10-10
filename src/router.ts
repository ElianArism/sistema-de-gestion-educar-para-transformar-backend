import { Router } from "express"
import authRoutes from "./modules/auth/auth.routes"
import commentRoutes from "./modules/comment/comment.routes"
import courseRoutes from "./modules/courses/courses.routes"
import userRoutes from "./modules/user/user.routes"

const AppRouter = Router()

AppRouter.use("/auth", authRoutes)
AppRouter.use("/users", userRoutes)
AppRouter.use("/comment", commentRoutes)
AppRouter.use("/courses", courseRoutes)
export default AppRouter
