import Router from 'koa-router';
import AuthKoaController from '../Controllers/AuthKoaController';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/auth'
};

const router: Router = new Router(routerOpts);

router.get('/me', AuthorizeKoaMiddleware(Permissions.AUTH_GET_ME), AuthKoaController.getMe);
router.put('/me', AuthorizeKoaMiddleware(Permissions.AUTH_GET_ME), AuthKoaController.updateMe);
router.post('/login', AuthKoaController.login);
router.post('/signup', AuthKoaController.signup);
router.post('/logout', AuthorizeKoaMiddleware(Permissions.AUTH_GET_ME), AuthKoaController.logout);
router.post('/refresh-token', AuthorizeKoaMiddleware(Permissions.AUTH_GET_ME), AuthKoaController.refreshToken);
router.post('/forgot-password', AuthKoaController.forgotPassword);
router.post('/change-forgot-password', AuthKoaController.changeForgotPassword);
router.put('/verify-your-account/:confirmationToken', AuthKoaController.verifyAccount);
router.get('/permissions', AuthKoaController.getPermissions);
router.post('/sync-roles-permissions', AuthorizeKoaMiddleware(Permissions.AUTH_SYNC_PERMISSIONS), AuthKoaController.syncRolesPermissions);

export default router;
