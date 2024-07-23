export default {
  PORT: process.env.PORT ?? 3000,
  TARGET_ENV: process.env.TARGET_ENV ?? 'dev'
} as const;