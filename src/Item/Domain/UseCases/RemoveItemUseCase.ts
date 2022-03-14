import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../Entities/IItemDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';

class RemoveItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
