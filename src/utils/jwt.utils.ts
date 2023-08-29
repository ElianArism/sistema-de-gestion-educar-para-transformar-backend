import jwt from "jsonwebtoken"

export const signJWT = (role: string, id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        role,
        id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "12h",
      },
      (error, token) => {
        if (error) {
          return reject({
            error: {
              message: "Error signing JWT",
              error,
            },
          })
        }
        return resolve(token as string)
      }
    )
  })
}

export const verifyJWT = (
  token: string
): Promise<{ valid: boolean; data?: { id: string; role: string } }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (error, decoded: any) => {
      if (error) {
        return reject({
          valid: false,
        })
      }
      return resolve({
        valid: true,
        data: {
          id: decoded.id,
          role: decoded.role,
        },
      })
    })
  })
}
