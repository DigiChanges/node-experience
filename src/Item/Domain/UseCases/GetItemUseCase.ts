import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import {REPOSITORIES} from '../../../repositories';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';

class GetItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetItemUseCase;
