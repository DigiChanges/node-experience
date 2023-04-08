import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import { REPOSITORIES } from '../../../Config/Injects';
import IAuthRepository from '../../Infrastructure/Repositories/Auth/IAuthRepository';
import ForbiddenHttpException from '../../Presentation/Exceptions/ForbiddenHttpException';
import IUserRepository from '../../Infrastructure/Repositories/User/IUserRepository';
import IUserDomain from '../Entities/IUserDomain';

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

        if (verified.error === 'unauthorized_client' || verified.error === 'unauthorized_client')
        {
            throw new ForbiddenHttpException();
        }
    }

    public async getAuthUser(token: string, hasActiveAuthorization: boolean): Promise<IUserDomain>
    {
        return await this.repository.verifyToken({ token, hasActiveAuthorization });
    }
}

export default AuthorizeService;
