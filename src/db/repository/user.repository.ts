import { Model } from "mongoose"

export class UserRepository<T> {
  private readonly model!: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  get(): Promise<T[]> {
    return this.model.find()
  }

  getById(id: string): Promise<T | null> {
    return this.model.findOne({ id })
  }

  delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ id }, { new: true })
  }

  updatePassword(id: string, password: string): Promise<T | null> {
    return this.model.findOneAndUpdate({ id }, { password })
  }
}
