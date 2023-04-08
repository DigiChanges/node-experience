import RefreshTokenPayload from '../../Payloads/Auth/RefreshTokenPayload';
import { REPOSITORIES } from '../../../../Config/Injects';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import MainConfig from '../../../../Config/MainConfig';
import ErrorHttpException from '../../../../Shared/Presentation/Shared/ErrorHttpException';

class RefreshTokenUseCase
{
    private repository: IAuthRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    async handle(payload: RefreshTokenPayload): Promise<any>
    {
        // ! Remove it from here on another exception without http
        const statusCode = MainConfig.getInstance().getConfig().statusCode;

        const refreshData = await this.repository.refreshToken(payload);

        if (refreshData?.error)
        {
            // ! Add Custom Exception with mapping on an HttpException
            throw new ErrorHttpException(statusCode['HTTP_UNAUTHORIZED'], { message: 'Invalid Credentials.' });
        }

        return {
            accessToken: refreshData.access_token,
            refreshToken: refreshData.refresh_token,
            expiresIn: refreshData.expires_in,
            refreshExpiresIn: refreshData.refresh_expires_in
        };
    }
}

export default RefreshTokenUseCase;
