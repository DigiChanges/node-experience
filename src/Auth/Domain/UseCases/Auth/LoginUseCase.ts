import AuthPayload from '../../Payloads/Auth/AuthPayload';

import { REPOSITORIES } from '../../../../Config/Injects';

import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';

class LoginUseCase
{
    private readonly repository: IAuthRepository;

    constructor()
    {
        const { container } = getRequestContext();

        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    async handle(payload: AuthPayload): Promise<any>
    {
        // TODO: Add enable functionality
        // TODO: Add role validation when its enable false
        const loginData = await this.repository.login(payload);

        if(loginData?.access_token)
        {

        }

        const tokenContent = await this.repository.verifyToken({ token: loginData.access_token });

        return {
            tokens: loginData,

        };
    }
}

export default LoginUseCase;
