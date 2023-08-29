import { Request, Response } from "express"
import Comment from "../../db/models/comment.model"
import { IComment } from "../../interfaces/comment.interface"

export const createComment = async (req: Request, res: Response) => {
  const comment = req.body as IComment

  try {
    const commentDoc = new Comment(comment)
    await commentDoc.save()

    return res.json({
      ok: true,
      data: comment,
    })
  } catch (error: any) {
    return res.status(error?.status || 500).json({
      ok: false,
      error: {
        message: error?.message || "",
        error,
      },
    })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    return res.json({
      ok: true,
      data: (await Comment.find()) ?? [],
    })
  } catch (error: any) {
    return res.status(error?.status || 500).json({
      ok: false,
      error: {
        message: error?.message || "",
        error,
      },
    })
  }
}

export const getCommentById = async (req: Request, res: Response) => {
  const commentId = req.params?.id ?? ""

  if (!commentId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }
  try {
    const comment = await Comment.findById(commentId)

    if (!comment) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Comment not found",
        },
      })
    }

    return res.json({
      ok: true,
      data: comment,
    })
  } catch (error: any) {
    return res.status(error?.status || 500).json({
      ok: false,
      error: {
        message: error?.message || "",
        error,
      },
    })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params?.id ?? ""

  if (!commentId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }
  try {
    const comment = await Comment.findByIdAndDelete(commentId)

    if (!comment) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Comment not found",
        },
      })
    }

    return res.json({
      ok: true,
      data: comment,
    })
  } catch (error: any) {
    return res.status(error?.status || 500).json({
      ok: false,
      error: {
        message: error?.message || "",
        error,
      },
    })
  }
}
