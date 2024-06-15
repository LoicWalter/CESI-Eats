export default () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  API_KEY: process.env.API_KEY,
  DATABASE_URL_USERS: process.env.DATABASE_URL_USERS,
  RABBIT_MQ_AUTH_QUEUE: process.env.RABBIT_MQ_AUTH_QUEUE,
  RABBIT_MQ_URI: process.env.RABBIT_MQ_URI,
});
