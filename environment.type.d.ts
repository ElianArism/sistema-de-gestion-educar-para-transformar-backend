declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    CONN_STR: string
    JWT_SECRET_KEY: string
    LOGS_ENABLED: boolean
  }
}
