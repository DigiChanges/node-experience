import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import IItemRepository from '../../../InterfaceAdapters/IRepositories/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import IItemDomain from '../../../InterfaceAdapters/IDomain/IItemDomain';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

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
