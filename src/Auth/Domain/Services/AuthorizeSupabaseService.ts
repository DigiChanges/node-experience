import { REPOSITORIES } from '../../../Config/Injects';
import IAuthRepository from '../../Infrastructure/Repositories/Auth/IAuthRepository';
import ForbiddenHttpException from '../../Presentation/Exceptions/ForbiddenHttpException';
import container from '../../../register';

class AuthorizeSupabaseService
{
    private repository: IAuthRepository;

    constructor()
    {
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
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
}

export default AuthorizeSupabaseService;
