export interface Subject {
  id: string
  name: string
  students: string[] // id de estudiantes
  schedules: string[] // horarios
  professorId: string // profesor
}

export interface News {
  id: string
  date: string
  title: string
  authorId?: string
  description?: string
  imgUrl: string
}

export interface Comment {
  id: string
  description: string
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  name: string
}
