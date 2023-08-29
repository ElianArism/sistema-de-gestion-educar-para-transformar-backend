import { Request, Response } from "express"
import { AvailableRoles } from "../../enums/roles.enum"
import { LoginUserDTO } from "../../interfaces/login-user-dto.interface"
import { isEqualToEcryptedField } from "../../utils/encription.utils"
import { getUserCollectionByRole } from "../../utils/get-user-repository-by-role"

export const login = async (req: Request, res: Response) => {
  const { id, password, role } = req.body as LoginUserDTO

  try {
    const collection = getUserCollectionByRole(role as AvailableRoles)

    if (!collection) {
      return res.status(400).json({
        ok: false,
        error: {
          message: `Param :role does not exists or it is invalid`,
        },
      })
    }

    const user = await collection.getById(id)

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "User not found",
        },
      })
    }

    if (isEqualToEcryptedField(password, user.password)) {
      // TODO create JWT
      return res.json({
        ok: true,
        data: user,
      })
    } else {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Invalid id / password",
        },
      })
    }
  } catch (error: any) {
    return res.status(error?.status ?? 500).json({
      ok: false,
      error: {
        message: error?.message,
        logs: error,
      },
    })
  }
}

export const renewSession = async (req: Request, res: Response) => {}

export const logout = async (req: Request, res: Response) => {}
