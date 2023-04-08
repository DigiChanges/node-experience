import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import IUserDomain from '../Entities/IUserDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IAuthRepository from '../../Infrastructure/Repositories/Auth/IAuthRepository';
import ForbiddenHttpException from '../../Presentation/Exceptions/ForbiddenHttpException';
import RegisterPayload from '../Payloads/Auth/RegisterPayload';

class KeycloakAuthService
{
    private repository: IAuthRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    public getPermissions(authUser: IUserDomain): string[]
    {
        // Get permissions from keycloak
        return [];
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
}

export default KeycloakAuthService;
