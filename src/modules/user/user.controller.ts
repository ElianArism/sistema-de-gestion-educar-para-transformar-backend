import type { Request, Response } from "express"
import Parent from "../../db/models/parent.model"
import Student from "../../db/models/student.model"
import { AvailableRoles } from "../../enums/roles.enum"
import { IParent, IProfessor, IStudent } from "../../interfaces/user.interface"
import { encrypt, isEqualToEcryptedField } from "../../utils/encription.utils"
import { getUserCollectionByRole } from "../../utils/get-user-repository-by-role"

export const createParent = async (req: Request, res: Response) => {
  const parentDTO = req.body as IParent

  try {
    parentDTO.password = encrypt(parentDTO.password)
    parentDTO.role = AvailableRoles.parent
    const parentExists = await Parent.findOne({ id: parentDTO.id })

    if (parentExists) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Parent already exists with this DNI / ID",
        },
      })
    }
    parentDTO.password = encrypt(parentDTO.password)
    const parentDoc = new Parent(parentDTO)
    await parentDoc.save()

    return {
      ok: true,
      data: {
        id: parentDTO.id,
      },
    }
  } catch (error: any) {
    if (process.env.LOGS_ENABLED) {
      console.log("===== Error =====")
      console.log(error)
      console.log("===== End Error =====")
    }

    return res.status(error?.status ?? 500).json({
      ok: false,
      error: {
        message: error?.message,
        logs: error,
      },
    })
  }
}

export const updateParent = async (req: Request, res: Response) => {
  const id = req.params.id
  const {
    role,
    id: parentId,
    son,
    password,
    ...parentDTO
  } = req.body as IParent

  if (!id) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }

  try {
    const parentUpdated = await Parent.findOneAndUpdate({ id }, parentDTO)

    if (!parentUpdated) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Parent does not exists in DB",
        },
      })
    }

    return res.json({
      ok: true,
      data: parentUpdated,
    })
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

export const createStudent = async (req: Request, res: Response) => {
  const studentDTO = req.body as IStudent

  try {
    studentDTO.password = encrypt(studentDTO.password)
    studentDTO.role = AvailableRoles.student
    const studentDoc = new Student(studentDTO)
    await studentDoc.save()

    return res.json({
      ok: true,
      data: {
        id: studentDoc.id,
      },
    })
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
export const updateStudent = async (req: Request, res: Response) => {
  const { password, id, role, ...studentDTO } = req.body as IStudent
  const studentId = req.params?.id

  if (!studentId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }

  try {
    const studentUpdated = await Student.findOneAndUpdate(
      { id: studentId },
      studentDTO
    )

    if (!studentUpdated) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Student not found",
        },
      })
    }

    return res.json({
      ok: true,
      data: {
        id: studentUpdated.id,
      },
    })
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

export const createProfessor = async (req: Request, res: Response) => {
  const professorDTO = req.body as IProfessor

  try {
    professorDTO.password = encrypt(professorDTO.password)
    professorDTO.role = AvailableRoles.professor
    const professorDoc = new Student(professorDTO)
    await professorDoc.save()

    return res.json({
      ok: true,
      data: {
        id: professorDoc.id,
      },
    })
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

export const updateProfessor = async (req: Request, res: Response) => {
  const { password, id, role, ...professorDTO } = req.body as IProfessor
  const professorId = req.params?.id
  try {
    const professorUpdated = await Student.findOneAndUpdate(
      { id: professorId },
      professorDTO
    )

    if (!professorUpdated) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Student not found",
        },
      })
    }

    return res.json({
      ok: true,
      data: {
        id: professorUpdated.id,
      },
    })
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

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params?.id
  const role = req.params?.role?.toLowerCase()

  if (!id || !role) {
    return res.status(400).json({
      ok: false,
      error: {
        message: `Param :${!id ? "id" : "role"} is required`,
      },
    })
  }

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

    const userDeleted = await collection.delete(id)

    if (!userDeleted) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "User not found",
        },
      })
    }

    return res.json({
      ok: true,
      data: userDeleted,
    })
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

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params?.id
  const role = req.params?.role?.toLowerCase()

  if (!id || !role) {
    return res.status(400).json({
      ok: false,
      error: {
        message: `Param :${!id ? "id" : "role"} is required`,
      },
    })
  }

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

    return res.json({
      ok: true,
      data: user,
    })
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

export const getAllUsers = async (req: Request, res: Response) => {
  const role = req.params?.role?.toLowerCase() ?? ""

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

    const users = await collection.get()

    return res.json({
      ok: true,
      data: users,
    })
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

export const updatePassword = async (req: Request, res: Response) => {
  const { id, password, newPassword } = req.body
  const { role } = req

  try {
    const collection = getUserCollectionByRole(role)

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
    } else if (!isEqualToEcryptedField(password, user.password)) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Invalid password",
        },
      })
    }

    await collection.updatePassword(id, newPassword)

    return res.json({
      ok: true,
      data: {
        id,
      },
    })
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
