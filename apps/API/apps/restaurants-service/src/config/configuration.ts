export default () => ({
  DATABASE_URL_RESTAURANTS: process.env.DATABASE_URL_RESTAURANTS,
  RABBIT_MQ_RESTAURANTS_QUEUE: process.env.RABBIT_MQ_RESTAURANTS_QUEUE,
  RABBIT_MQ_URI: process.env.RABBIT_MQ_URI,
});