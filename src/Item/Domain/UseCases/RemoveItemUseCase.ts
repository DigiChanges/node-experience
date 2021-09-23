import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';

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
