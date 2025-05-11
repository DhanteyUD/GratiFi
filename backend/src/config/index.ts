export const configKeys = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5001,
  jwtSecret: process.env.JWT_SECRET!,
  resendApiKey: process.env.RESEND_API_KEY,
};
