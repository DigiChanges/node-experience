import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../../Shared/Infrastructure/Orm/IPaginator';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';

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
