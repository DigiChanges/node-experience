import ItemRepPayload from '../Payloads/ItemRepPayload';
import IItemDomain from '../Entities/IItemDomain';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import Item from '../Entities/Item';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

class SaveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ItemRepPayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        const item = new Item(payload);
        item.createdBy = authUser;

        return await this.repository.save(item);
    }
}

export default SaveItemUseCase;
