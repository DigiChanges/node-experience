import Router from 'koa-router';
import NotificationKoaController from '../Controller/NotificationKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/notifications'
};

const router: Router = new Router(routerOpts);

router.post('/subscription', NotificationKoaController.handleSubscription);
router.post('/message', NotificationKoaController.handleMessage);

export default router;
