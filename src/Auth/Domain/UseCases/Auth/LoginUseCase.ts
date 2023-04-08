import AuthPayload from '../../Payloads/Auth/AuthPayload';

import { REPOSITORIES } from '../../../../Config/Injects';

import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import ErrorHttpException from '../../../../Shared/Presentation/Shared/ErrorHttpException';
import MainConfig from '../../../../Config/MainConfig';
import ILoginResponse from '../../Models/ILoginResponse';

class LoginUseCase
{
    private readonly repository: IAuthRepository;

    constructor()
    {
        const { container } = getRequestContext();

        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    async handle(payload: AuthPayload): Promise<ILoginResponse>
    {
        const config = MainConfig.getInstance().getConfig();
        // ! Remove it from here on another exception without http
        const statusCode = config.statusCode;
        const { authorization: hasActiveAuthorization } = config.auth;

        const loginData = await this.repository.login(payload);

        if (loginData?.error)
        {
            // ! Add Custom Exception with mapping on an HttpException
            throw new ErrorHttpException(statusCode['HTTP_UNAUTHORIZED'], { message: 'Invalid Credentials.' });
        }

        const user = await this.repository.verifyToken({
            token: loginData.access_token,
            hasActiveAuthorization
        });

        return {
            accessToken: loginData.access_token,
            refreshToken: loginData.refresh_token,
            expiresIn: loginData.expires_in,
            refreshExpiresIn: loginData.refresh_expires_in,
            user
        };
    }
}

export default LoginUseCase;
