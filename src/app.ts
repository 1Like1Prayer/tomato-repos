import config from './config/config';
import logger from './logger/logger';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import errorMiddleware from './middleware/errorMiddleware';
import router from './routes';
import { RateLimit } from 'koa2-ratelimit';

const limiter = RateLimit.middleware({
  interval: { min: 15 }, // 15 minutes = 15*60*1000
  max: 100 // limit each IP to 100 requests per interval
});
const app = new Koa();

app
  .use(limiter)
  .use(helmet())
  .use(cors())
  .use(bodyParser())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(errorMiddleware);

app.on('error', (err, ctx) => {
  logger.error(err, ctx);
});
//@ts-ignore
app.listen(3000, () => console.log('listening on port', config.PORT));
