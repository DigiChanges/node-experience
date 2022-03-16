import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../Entities/IItemDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';

class GetItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        return await this.repository.getOne(payload.id);
    }
}

export default GetItemUseCase;
