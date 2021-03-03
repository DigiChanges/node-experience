import {ICriteria, IPaginator} from "@digichanges/shared-experience";

import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class ListRolesUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListRolesUseCase;
