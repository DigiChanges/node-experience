import Koa from 'koa';
import dayjs from 'dayjs';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import AuthTransformer from '../Transformers/AuthTransformer';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import { AuthUser } from '../Helpers/AuthUser';
import UserTransformer from '../Transformers/UserTransformer';
import { DefaultTransformer, ErrorHttpException, StatusCode } from '@digichanges/shared-experience';
import MainConfig from '../../../Config/MainConfig';
import ForgotPasswordPayload from '../../Domain/Payloads/Auth/ForgotPasswordPayload';
import RefreshTokenPayload from '../../Domain/Payloads/Auth/RefreshTokenPayload';
import AuthPayload from '../../Domain/Payloads/Auth/AuthPayload';
import LogoutPayload from '../../Domain/Payloads/Auth/LogoutPayload';
import AuthHelperService from '../../Domain/Services/AuthHelperService';
import LoginUseCase from '../../Domain/UseCases/Auth/LoginUseCase';
import RegisterUseCase from '../../Domain/UseCases/Auth/RegisterUseCase';
import UpdateMeUseCase from '../../Domain/UseCases/Auth/UpdateMeUseCase';
import LogoutUseCase from '../../Domain/UseCases/Auth/LogoutUseCase';
import RefreshTokenUseCase from '../../Domain/UseCases/Auth/RefreshTokenUseCase';
import ForgotPasswordUseCase from '../../Domain/UseCases/Auth/ForgotPasswordUseCase';
import ChangeForgotPasswordUseCase from '../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase';
import VerifyYourAccountUseCase from '../../Domain/UseCases/Auth/VerifyYourAccountUseCase';
import PermissionUseCase from '../../Domain/UseCases/Auth/PermissionUseCase';
import IGroupPermission from '../../../Config/IGroupPermission';
import SyncPermissionsUseCase from '../../Domain/UseCases/Auth/SyncPermissionsUseCase';

class AuthKoaController
{
    private static responder: KoaResponder = new KoaResponder();

    static async getMe(ctx: Koa.ParameterizedContext & any)
    {
        void await AuthKoaController.responder.send(
            AuthUser(ctx),
            ctx as Koa.DefaultContext,
            StatusCode.HTTP_OK,
            new UserTransformer()
        );
    }

    static async updateMe(ctx: Koa.ParameterizedContext & any)
    {
        const data = {
            ...ctx.request.body,
            authUser: AuthUser(ctx),
            birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate()
        };

        const useCase = new UpdateMeUseCase();
        const payload = await useCase.handle(data);

        void await AuthKoaController.responder.send(
            payload,
            ctx,
            StatusCode.HTTP_CREATED,
            new UserTransformer()
        );
    }

    static async login(ctx: Koa.ParameterizedContext & any)
    {
        const data = {
            ...ctx.request.body
        };

        const useCase = new LoginUseCase();
        const payload = await useCase.handle(data as AuthPayload);

        ctx.cookies.set('accessToken', payload.accessToken, {
            expires: dayjs().add(payload.expiresIn, 'second').toDate(),
            path: '/api',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        });

        ctx.cookies.set('refreshToken', payload.refreshToken, {
            expires: dayjs().add(payload.refreshExpiresIn, 'second').toDate(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        });

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    static async signup(ctx: Koa.ParameterizedContext & any)
    {
        const data = {
            ...ctx.request.body,
            birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate()
        };

        const useCase = new RegisterUseCase();
        const payload = await useCase.handle(data);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
    }

    static async logout(ctx: Koa.ParameterizedContext & any)
    {
        const cookies = ctx.get('Cookie');

        const data: LogoutPayload = {
            token: new AuthHelperService().getToken(cookies, 'accessToken')
        };

        const useCase = new LogoutUseCase();
        const payload = await useCase.handle(data);

        ctx.cookies.set('accessToken', '', {
            expires: dayjs().add(0, 'second').toDate(),
            path: '/api',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        });

        ctx.cookies.set('refreshToken', '', {
            expires: dayjs().add(0, 'second').toDate(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        });

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_OK, new DefaultTransformer());
    }

    static async refreshToken(ctx: Koa.ParameterizedContext & any)
    {
        const cookies = ctx.get('Cookie');
        const refreshToken = new AuthHelperService().getToken(cookies, 'refreshToken');

        const data: RefreshTokenPayload = {
            refreshToken
        };

        const useCase = new RefreshTokenUseCase();
        const payload = await useCase.handle(data);

        ctx.cookies.set('accessToken', payload.accessToken, {
            expires: dayjs().add(payload.expiresIn, 'second').toDate(),
            path: '/api',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        });

        ctx.cookies.set('refreshToken', payload.refreshToken, {
            expires: dayjs().add(payload.refreshExpiresIn, 'second').toDate(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        });

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_OK, new AuthTransformer());
    }

    static async forgotPassword(ctx: Koa.ParameterizedContext & any)
    {
        const data: ForgotPasswordPayload = {
            email: ctx.request.body.email
        };

        const useCase = new ForgotPasswordUseCase();
        const payload = await useCase.handle(data);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED);
    }

    static async changeForgotPassword(ctx: Koa.ParameterizedContext & any)
    {
        const useCase = new ChangeForgotPasswordUseCase();
        const payload = await useCase.handle(ctx.request.body);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED);
    }

    static async verifyAccount(ctx: Koa.ParameterizedContext & any)
    {
        const useCase = new VerifyYourAccountUseCase();
        const payload = await useCase.handle(ctx.params);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
    }

    static async getPermissions(ctx: Koa.ParameterizedContext & any)
    {
        const useCase = new PermissionUseCase();
        const payload: IGroupPermission[] = useCase.handle();

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    static async syncRolesPermissions(ctx: Koa.ParameterizedContext & any)
    {
        const useCase = new SyncPermissionsUseCase();
        await useCase.handle();

        void await AuthKoaController.responder.send({ message: 'Sync Successfully' }, ctx, StatusCode.HTTP_CREATED);
    }
}

export default AuthKoaController;
