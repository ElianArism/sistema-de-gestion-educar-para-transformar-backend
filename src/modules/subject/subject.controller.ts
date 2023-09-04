import { Request, Response } from "express"
import Subject from "../../db/models/subject.model"

export const createSubject = async (req: Request, res: Response) => {
  const subjectDTO = req.body
  try {
    const subjectDoc = new Subject(subjectDTO)
    await subjectDoc.save()
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

export const updateSubject = async (req: Request, res: Response) => {
  const subjectDTO = req.body
  const subjectId = req.params.id

  if (!subjectId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }
  try {
    const subjectUpdated = await Subject.findByIdAndUpdate(
      subjectId,
      subjectDTO
    )
    if (!subjectUpdated) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "subject does not exists in DB",
        },
      })
    }
    return res.json({
      ok: true,
      data: {
        id: subjectId,
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
export const getSubjects = async (req: Request, res: Response) => {
  try {
    return res.json({
      ok: true,
      data: await Subject.find(),
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

export const getSubjectById = async (req: Request, res: Response) => {
  const subjectId = req.params.id

  if (!subjectId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }

  try {
    const subject = await Subject.findById(subjectId)

    if (!subject) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "subject does not exists in DB",
        },
      })
    }

    return res.json({
      ok: true,
      data: subject,
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

export const deleteSubject = async (req: Request, res: Response) => {
  const subjectId = req.params.id

  if (!subjectId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }

  try {
    const subject = await Subject.findByIdAndDelete(subjectId)

    if (!subject) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "subject does not exists in DB",
        },
      })
    }

    return res.json({
      ok: true,
      data: subject,
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
