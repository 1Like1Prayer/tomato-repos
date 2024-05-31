import logger from '../logger/logger';
import { Context, Next } from 'koa';

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: {
        message: err.message || 'Internal Server Error'
      }
    };
  }
};

export default errorMiddleware;
