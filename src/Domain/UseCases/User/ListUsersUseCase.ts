import { lazyInject } from '../../../inversify.config'
import ICriteria from "../../../InterfaceAdapters/Shared/ICriteria";
import IPaginator from "../../../InterfaceAdapters/Shared/IPaginator";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";

class ListUsersUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListUsersUseCase;
