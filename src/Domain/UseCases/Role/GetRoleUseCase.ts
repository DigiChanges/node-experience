import { lazyInject } from "../../../inversify.config";
import IRole from "../../../InterfaceAdapters/IEntities/IRole";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";

class GetRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: IdPayload): Promise<IRole>
    {
        const id = payload.id();
        return await this.repository.findOne(id);
    }
}

export default GetRoleUseCase;
