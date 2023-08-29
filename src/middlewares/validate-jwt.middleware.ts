import { NextFunction, Request, Response } from "express"
import { verifyJWT } from "../utils/jwt.utils"

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("authorization")

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: {
        message: "Unauthorized Request",
      },
    })
  }

  try {
    const { valid, data } = await verifyJWT(token)

    if (!valid || !data) {
      return res.status(401).json({
        ok: false,
        error: {
          message: "Invalid JWT",
        },
      })
    }

    req.id = data.id
    req.role = data.role
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      error: {
        message: error?.message || "Internal Server Error",
        logs: error,
      },
    })
  }
  next()
}
