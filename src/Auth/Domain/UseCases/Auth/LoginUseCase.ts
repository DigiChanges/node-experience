import AuthPayload from '../../Payloads/Auth/AuthPayload';

import { REPOSITORIES } from '../../../../Config/Injects';

import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import { ErrorHttpException, StatusCode } from '@digichanges/shared-experience';
import MainConfig from '../../../../Config/MainConfig';
import ILoginResponse from '../../Models/ILoginResponse';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import AuthSchemaValidation from '../../../Presentation/Validations/Auth/AuthSchemaValidation';

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
        await ValidatorSchema.handle(AuthSchemaValidation, payload);

        const loginData = await this.repository.login(payload);

        if (loginData?.error)
        {
            // ! Add Custom Exception with mapping on an HttpException
            throw new ErrorHttpException(StatusCode.HTTP_UNAUTHORIZED, { message: 'Invalid Credentials.' });
        }

        return {
            accessToken: loginData.access_token,
            refreshToken: loginData.refresh_token,
            expiresIn: loginData.expires_in,
            refreshExpiresIn: loginData.refresh_expires_in
        };
    }
}

export default LoginUseCase;
