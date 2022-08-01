import { DependencyContainer } from 'tsyringe';
import ErrorHttpException from '../../../Shared/Presentation/Shared/ErrorHttpException';
import AuthService from '../../Domain/Services/AuthService';
import { SERVICES } from '../../../Config/Injects';
import StatusCode from '../../../Shared/Application/StatusCode';

const RefreshTokenExpressMiddleware = async(req: any, response: any, next: any) =>
{
    try
    {
        const container: DependencyContainer = req.container;
        const authService = container.resolve<AuthService>(SERVICES.AuthService);
        const refreshToken = req.headers.cookie.split('refreshToken=')[1];

        if (refreshToken)
        {
            authService.validateRefreshToken(refreshToken);
            req.refreshToken = refreshToken;
        }
        else
        {
            throw new ErrorHttpException(StatusCode.HTTP_UNAUTHORIZED, { message: 'Missing refresh token' });
        }

        next();
    }
    catch (error)
    {
        next(error);
    }
};

export default RefreshTokenExpressMiddleware;
