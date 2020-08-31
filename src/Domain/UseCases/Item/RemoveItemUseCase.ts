import { lazyInject } from '../../../inversify.config'
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";
import IItemDomain from "../../../InterfaceAdapters/IDomain/IItemDomain";

class RemoveItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
