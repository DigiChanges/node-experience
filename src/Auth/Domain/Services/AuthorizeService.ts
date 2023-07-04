import { getRequestContext } from '../../../Shared/Utils/RequestContext';
import { REPOSITORIES } from '../../../Config/Injects';
import IAuthRepository from '../../Infrastructure/Repositories/Auth/IAuthRepository';
import ForbiddenHttpException from '../../Presentation/Exceptions/ForbiddenHttpException';
import IUserRepository from '../../Infrastructure/Repositories/User/IUserRepository';
import IUserDomain from '../Entities/IUserDomain';
import VerifyTokenPayload from '../../Infrastructure/Repositories/Auth/Payload/VerifyTokenPayload';

class AuthorizeService
{
    private repository: IAuthRepository;
    private userRepository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
        this.userRepository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    public async authorize(token: string, handlerPermissions: string[]): Promise<void>
    {
        const permission = handlerPermissions[0]; // ! TODO: Warning, to be refactor ?
        const verified = await this.repository.checkPermissions({ token, permission });

        if (verified.error === 'access_denied' || verified.error === 'unauthorized_client')
        {
            throw new ForbiddenHttpException();
        }
    }

    public async getAuthUser({ token, hasActiveAuthorization }: VerifyTokenPayload): Promise<IUserDomain>
    {
        return await this.repository.verifyToken({ token, hasActiveAuthorization });
    }
}

export default AuthorizeService;
