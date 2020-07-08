import { lazyInject } from '../../../inversify.config'
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";

class RemoveItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.id();
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
