import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class GetItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetItemUseCase;
