import {ICriteria, IPaginator} from "@digichanges/shared-experience";

import { lazyInject } from '../../../inversify.config';
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
