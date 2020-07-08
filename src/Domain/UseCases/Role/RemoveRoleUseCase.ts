import { lazyInject } from '../../../inversify.config'
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";

class RemoveRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.id();
        return await this.repository.delete(id);
    }
}

export default RemoveRoleUseCase;
