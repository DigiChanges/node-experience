import ItemRepPayload from '../Payloads/ItemRepPayload';
import IItemDomain from '../Entities/IItemDomain';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import Item from '../Entities/Item';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';

class SaveItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemRepPayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        const item = new Item(payload);
        item.createdBy = authUser;

        return await this.repository.save(item);
    }
}

export default SaveItemUseCase;
