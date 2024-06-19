export default () => ({
  DATABASE_URL_ORDERS: process.env.DATABASE_URL_ORDERS,
  RABBIT_MQ_URI: process.env.RABBIT_MQ_URI,
  RABBIT_MQ_ORDERS_QUEUE: process.env.RABBIT_MQ_ORDERS_QUEUE,
});
