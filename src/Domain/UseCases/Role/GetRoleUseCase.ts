import { lazyInject } from "../../../inversify.config";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

class GetRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.id();
        return await this.repository.getOne(id);
    }
}

export default GetRoleUseCase;
