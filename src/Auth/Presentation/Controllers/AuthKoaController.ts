import Koa from 'koa';
import dayjs from 'dayjs';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import AuthTransformer from '../Transformers/AuthTransformer';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import UserTransformer from '../Transformers/UserTransformer';
import { DefaultTransformer, StatusCode } from '@digichanges/shared-experience';
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
import AuthorizeService from '../../Domain/Services/AuthorizeService';
import ChangeForgotPasswordPayload from '../../Domain/Payloads/Auth/ChangeForgotPasswordPayload';
import RegisterPayload from '../../Domain/Payloads/Auth/RegisterPayload';
import UpdateMePayload from '../../Domain/Payloads/Auth/UpdateMePayload';

class AuthKoaController
{
    private static responder: KoaResponder = new KoaResponder();

    static async getMe(ctx: Koa.ParameterizedContext)
    {
        const cookies = ctx.get('Cookie');
        const token = new AuthHelperService().getToken(cookies, 'accessToken');
        const authUser = await (new AuthorizeService()).getAuthUser({
            token, hasActiveAuthorization: true
        });

        void await AuthKoaController.responder.send(
            authUser,
            ctx as Koa.DefaultContext,
            StatusCode.HTTP_OK
        );
    }

    static async updateMe(ctx: Koa.ParameterizedContext)
    {
        const cookies = ctx.get('Cookie');
        const token = new AuthHelperService().getToken(cookies, 'accessToken');
        const authUser = await (new AuthorizeService()).getAuthUser({
            token, hasActiveAuthorization: true
        });

        const body = ctx.request.body as Record<string, any>;

        const data = {
            ...body,
            authUser,
            birthdate: dayjs(body.birthdate, 'yyyy-mm-dd').toDate()
        };

        const useCase = new UpdateMeUseCase();
        const payload = await useCase.handle(data as UpdateMePayload);

        void await AuthKoaController.responder.send(
            payload,
            ctx,
            StatusCode.HTTP_CREATED,
            new UserTransformer()
        );
    }

    static async login(ctx: Koa.ParameterizedContext)
    {
        const useCase = new LoginUseCase();
        const payload = await useCase.handle(ctx.request.body as AuthPayload);

        ctx.cookies.set('accessToken', payload.accessToken, {
            expires: dayjs().add(payload.expiresIn, 'second').toDate(),
            path: '/api',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as boolean | 'none' | 'lax' | 'strict'
        });

        ctx.cookies.set('refreshToken', payload.refreshToken, {
            expires: dayjs().add(payload.refreshExpiresIn, 'second').toDate(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as boolean | 'none' | 'lax' | 'strict'
        });

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    static async signup(ctx: Koa.ParameterizedContext)
    {
        const body = ctx.request.body as Record<string, any>;

        const data = {
            ...body,
            birthdate: dayjs(body.birthdate, 'yyyy-mm-dd').toDate()
        };

        const useCase = new RegisterUseCase();
        const payload = await useCase.handle(data as RegisterPayload);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
    }

    static async logout(ctx: Koa.ParameterizedContext)
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
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as boolean | 'none' | 'lax' | 'strict'
        });

        ctx.cookies.set('refreshToken', '', {
            expires: dayjs().add(0, 'second').toDate(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as boolean | 'none' | 'lax' | 'strict'
        });

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_OK, new DefaultTransformer());
    }

    static async refreshToken(ctx: Koa.ParameterizedContext)
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
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as boolean | 'none' | 'lax' | 'strict'
        });

        ctx.cookies.set('refreshToken', payload.refreshToken, {
            expires: dayjs().add(payload.refreshExpiresIn, 'second').toDate(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as boolean | 'none' | 'lax' | 'strict'
        });

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_OK, new AuthTransformer());
    }

    static async forgotPassword(ctx: Koa.ParameterizedContext)
    {
        const useCase = new ForgotPasswordUseCase();
        const payload = await useCase.handle(ctx.request.body as ForgotPasswordPayload);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED);
    }

    static async changeForgotPassword(ctx: Koa.ParameterizedContext)
    {
        const useCase = new ChangeForgotPasswordUseCase();
        const payload = await useCase.handle(ctx.request.body as ChangeForgotPasswordPayload);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED);
    }

    static async verifyAccount(ctx: Koa.ParameterizedContext)
    {
        const useCase = new VerifyYourAccountUseCase();
        const payload = await useCase.handle(ctx.params);

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
    }

    static async getPermissions(ctx: Koa.ParameterizedContext)
    {
        const useCase = new PermissionUseCase();
        const payload: IGroupPermission[] = useCase.handle();

        void await AuthKoaController.responder.send(payload, ctx, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    static async syncRolesPermissions(ctx: Koa.ParameterizedContext)
    {
        const useCase = new SyncPermissionsUseCase();
        await useCase.handle();

        void await AuthKoaController.responder.send({ message: 'Sync Successfully' }, ctx, StatusCode.HTTP_CREATED);
    }
}

export default AuthKoaController;
