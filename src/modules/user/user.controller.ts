import type { Request, Response } from "express"
import Authority from "../../db/models/authority.model"
import Parent from "../../db/models/parent.model"
import Personal from "../../db/models/personal.model"
import Professor from "../../db/models/professor.model"
import Student from "../../db/models/student.model"
import { AvailableRoles } from "../../enums/roles.enum"
import {
  IParent,
  IProfessor,
  IStudent,
  IUser,
} from "../../interfaces/user.interface"
import { encrypt, isEqualToEcryptedField } from "../../utils/encription.utils"
import { getUserCollectionByRole } from "../../utils/get-user-repository-by-role"

export const createAuthority = async (req: Request, res: Response) => {
  const authorityDTO = req.body as IUser

  try {
    authorityDTO.password = encrypt(authorityDTO.password)
    authorityDTO.role = AvailableRoles.authority
    const authorityExists = await Authority.findOne({ id: authorityDTO.id })

    if (authorityExists) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "authority already exists with this DNI / ID",
        },
      })
    }
    authorityDTO.password = encrypt(authorityDTO.password)
    const authorityDoc = new Authority({
      ...authorityDTO,
      _id: authorityDTO.id,
    })
    await authorityDoc.save()

    return {
      ok: true,
      data: {
        id: authorityDTO.id,
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

export const createPersonal = async (req: Request, res: Response) => {
  const personalDTO = req.body as IUser

  try {
    personalDTO.password = encrypt(personalDTO.password)
    personalDTO.role = AvailableRoles.personal
    const personalExists = await Personal.findOne({ id: personalDTO.id })

    if (personalExists) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Personal already exists with this DNI / ID",
        },
      })
    }
    personalDTO.password = encrypt(personalDTO.password)
    const personalDoc = new Personal({ ...personalDTO, _id: personalDTO.id })
    await personalDoc.save()

    return {
      ok: true,
      data: {
        id: personalDTO.id,
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
    const parentDoc = new Parent({ ...parentDTO, _id: parentDTO.id })
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
    const studentExists = await Student.findOne({ id: studentDTO.id })

    if (studentExists) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Student already exists with this DNI / ID",
        },
      })
    }
    studentDTO.password = encrypt(studentDTO.password)
    studentDTO.role = AvailableRoles.student
    const studentDoc = new Student({ ...studentDTO, _id: studentDTO.id })
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
    const professorExists = await Professor.findOne({ id: professorDTO.id })

    if (professorExists) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Professor already exists with this DNI / ID",
        },
      })
    }
    professorDTO.password = encrypt(professorDTO.password)
    professorDTO.role = AvailableRoles.professor
    const professorDoc = new Professor({
      ...professorDTO,
      _id: professorDTO.id,
    })
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

export const payFee = async (req: Request, res: Response) => {
  const { studentId, ...dto } = req.body

  try {
    const student = await Student.findOne({ id: studentId })

    if (!student) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Student not found",
        },
      })
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      {
        fees: student?.fees?.length
          ? [...dto.fees, ...student.fees]
          : [...dto.fees],
      },
      { new: true }
    )

    return res.json({
      ok: true,
      data: {
        fees: (updatedStudent as IStudent).fees,
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
