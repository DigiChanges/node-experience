import Permissions from '../../../../Config/Permissions';
import Roles from '../../../../Config/Roles';
import container from '../../../../register';
import { REPOSITORIES } from '../../../../Config/Injects';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';

class SyncPermissionsUseCase
{
    private repository: IAuthRepository;

    constructor()
    {
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthzRepository);
    }

    async handle(): Promise<void>
    {
        const permissions: string[] =  Permissions.permissions();
        const roles: Map<string, string[]> =  Roles.getRoles();
    }
}

export default SyncPermissionsUseCase;
