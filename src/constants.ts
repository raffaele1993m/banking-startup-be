export default {
  DB_NAME: process.env.DB_NAME ?? "postgres",
  DB_USER: process.env.DB_USER ?? "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "l0c4lD3v3l0pm3nt",
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: process.env.DB_PORT ?? 5432,
  PORT: process.env.PORT ?? 3000,
  TARGET_ENV: process.env.TARGET_ENV ?? "dev"
} as const;