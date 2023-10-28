import RefreshTokenPayload from '../../Payloads/Auth/RefreshTokenPayload';
import { REPOSITORIES } from '../../../../Config/Injects';
import container from '../../../../register';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import { ErrorHttpException, StatusCode } from '@digichanges/shared-experience';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import RefreshTokenSchemaValidation from '../../../Presentation/Validations/Auth/RefreshTokenSchemaValidation';

class RefreshTokenUseCase
{
    private repository: IAuthRepository;

    constructor()
    {
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    async handle(payload: RefreshTokenPayload): Promise<any>
    {
        await ValidatorSchema.handle(RefreshTokenSchemaValidation, payload);

        const refreshData = await this.repository.refreshToken(payload);

        if (refreshData?.error)
        {
            // ! Add Custom Exception with mapping on an HttpException
            throw new ErrorHttpException(StatusCode.HTTP_UNAUTHORIZED, { message: 'Invalid Credentials.' });
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
