import Router from 'koa-router';
import AuthKoaController from '../Controllers/AuthKoaController';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/auth'
};

const router: Router = new Router(routerOpts);

router.get('/me', AuthKoaController.getMe);
router.put('/me', AuthKoaController.updateMe);
router.post('/login', AuthKoaController.login);
router.post('/signup', AuthKoaController.signup);
router.post('/logout', AuthKoaController.logout);
router.post('/refresh-token', AuthKoaController.refreshToken);
router.post('/forgot-password', AuthKoaController.forgotPassword);
router.post('/change-forgot-password', AuthKoaController.changeForgotPassword);
router.put('/verify-your-account/:confirmationToken', AuthKoaController.verifyAccount);
router.get('/permissions', AuthKoaController.getPermissions);
router.post('/sync-roles-permissions', AuthorizeKoaMiddleware(Permissions.AUTH_SYNC_PERMISSIONS), AuthKoaController.syncRolesPermissions);

export default router;
