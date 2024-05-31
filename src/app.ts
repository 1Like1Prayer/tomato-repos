import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import router from './routes';
import errorMiddleware from './middleware/errorMiddleware';
import config from './config/config';


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false // Disable the `X-RateLimit-*` headers.
});

const app = express();
app
    .use(limiter)
    .use(helmet())
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use(router)
    .use(errorMiddleware);

// @ts-ignore
app.listen(config.PORT, () =>  console.log('listening on port', config.PORT)
);

//this is for vercel deployment
export default app;
