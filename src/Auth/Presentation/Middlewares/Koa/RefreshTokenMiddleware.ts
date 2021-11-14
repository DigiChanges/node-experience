import Koa from 'koa';
import ErrorHttpException from '../../../../App/Presentation/Shared/ErrorHttpException';
import { StatusCode } from '@digichanges/shared-experience';
import ContainerFactory from '../../../../Shared/Factories/ContainerFactory';
import IAuthService from '../../../InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../../services';

const RefreshTokenMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    const authService =  ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
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
