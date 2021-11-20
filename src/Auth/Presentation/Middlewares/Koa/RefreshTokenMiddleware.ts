import Koa from 'koa';
import ErrorHttpException from '../../../../App/Presentation/Shared/ErrorHttpException';
import { StatusCode } from '@digichanges/shared-experience';
import AuthService from '../../../Domain/Services/AuthService';

const RefreshTokenMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    const authService =  new AuthService();
    const refreshToken = ctx.cookies.get('refreshToken');

    if (refreshToken)
    {
        authService.validateRefreshToken(refreshToken);
        ctx.refreshToken = refreshToken;
    }
    else
    {
        throw new ErrorHttpException(StatusCode.HTTP_UNAUTHORIZED, { message: 'Missing refresh token' });
    }

    await next();
};

export default RefreshTokenMiddleware;
