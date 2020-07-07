import { lazyInject } from '../../../inversify.config'
import IItem from "../../../InterfaceAdapters/IEntities/IItem";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";

class GetItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<IItem>
    {
        const id = payload.id();
        return await this.repository.findOne(id);
    }
}

export default GetItemUseCase;
