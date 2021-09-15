import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import Item from '../Entities/Item';

class RemoveItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<Item>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
