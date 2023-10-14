import { Request, Response } from "express"
import Course from "../../db/models/course.model"

export const getCourses = async (req: Request, res: Response) => {
  try {
    return res.json({
      ok: true,
      data: {
        courses: await Course.find()
          .populate("students.studentInfo", "-_id -__v")
          .populate("professor", "-_id -__v")
          .exec(),
      },
    })
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

export const createCourse = async (req: Request, res: Response) => {
  const course = req.body
  try {
    const doc = new Course(course)
    await doc.save()
    return res.json({
      ok: true,
      data: {
        id: doc._id,
      },
    })
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

export const updateCourse = async (req: Request, res: Response) => {
  const course = req.body
  const id = req.params.courseId
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, course)

    return res.status(!!updateCourse ? 200 : 404).json({
      ok: !!updatedCourse,
      data: {
        id: !!updatedCourse ? updatedCourse.toJSON() : "Course not found",
      },
    })
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

export const deleteCourse = async (req: Request, res: Response) => {
  const id = req.params.courseId
  try {
    const deletedCourse = await Course.findByIdAndDelete(id)

    return res.status(!!updateCourse ? 200 : 404).json({
      ok: !!deletedCourse,
      data: {
        id: !!deletedCourse ? deletedCourse.toJSON() : "Course not found",
      },
    })
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
