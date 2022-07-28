import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';

class ListUsersUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListUsersUseCase;
