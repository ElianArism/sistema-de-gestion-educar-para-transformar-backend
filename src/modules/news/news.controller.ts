import { Request, Response } from "express"
import News from "../../db/models/news.model"
import { INews } from "../../interfaces/news.interface"

export const createNews = async (req: Request, res: Response) => {
  const newsDTO = req.body as INews
  try {
    const newsDoc = new News(newsDTO)
    await newsDoc.save()
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
export const updateNews = async (req: Request, res: Response) => {
  const newsDTO = req.body as INews
  const newsId = req.params.id

  if (!newsId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }
  try {
    const newsUpdated = await News.findByIdAndUpdate(newsId, newsDTO)

    if (!newsUpdated) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "news does not exists in DB",
        },
      })
    }
    return res.json({
      ok: true,
      data: {
        id: newsId,
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

export const deleteNews = async (req: Request, res: Response) => {
  const newsId = req.params.id

  if (!newsId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }

  try {
    const news = await News.findByIdAndDelete(newsId)

    if (!news) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "news does not exists in DB",
        },
      })
    }

    return res.json({
      ok: true,
      data: news,
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

export const getNews = async (req: Request, res: Response) => {
  try {
    return res.json({
      ok: true,
      data: await News.find(),
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

export const getNewsById = async (req: Request, res: Response) => {
  const newsId = req.params.id

  if (!newsId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Param :id is required",
      },
    })
  }

  try {
    const news = await News.findById(newsId)

    if (!news) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "news does not exists in DB",
        },
      })
    }

    return res.json({
      ok: true,
      data: news,
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
