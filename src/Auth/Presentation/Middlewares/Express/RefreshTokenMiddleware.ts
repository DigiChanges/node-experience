import ErrorHttpException from '../../../../App/Presentation/Shared/ErrorHttpException';
import { StatusCode } from '@digichanges/shared-experience';
import AuthService from '../../../Domain/Services/AuthService';

const RefreshTokenMiddleware = async(req: any, response: any, next: any) =>
{
    try
    {
        const authService =  new AuthService();
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

export default RefreshTokenMiddleware;
