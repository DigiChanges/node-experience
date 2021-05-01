import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class RemoveItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
