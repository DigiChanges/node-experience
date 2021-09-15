import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import {REPOSITORIES} from '../../../repositories';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import Item from '../Entities/Item';

class GetItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<Item>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetItemUseCase;
