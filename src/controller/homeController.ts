import { Context, Next } from 'koa';

export const helloWorld = (ctx: Context, next: Next) => {
  ctx.body = 'hello world';
};

export const vercelHelloWorld = (ctx: Context, next: Next) => {
  ctx.body = 'hello vercel';
};
