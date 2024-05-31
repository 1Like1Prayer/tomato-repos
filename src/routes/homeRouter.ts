import Router from '@koa/router';
import {helloWorld, vercelHelloWorld} from '../controller/homeController';

const homeRouter :Router = new Router()
homeRouter.get('/',helloWorld)
homeRouter.get('/vercel',vercelHelloWorld)

export default homeRouter
