import Router from '@koa/router';
import homeRouter from './homeRouter';

const router:Router = new Router()
router.use(homeRouter.routes()).use(homeRouter.allowedMethods())
export default router;
