import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class GetRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetRoleUseCase;
