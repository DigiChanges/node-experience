import container from '../../../../register';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';

class ListUsersUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListUsersUseCase;
