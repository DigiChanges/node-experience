import ItemRepPayload from '../Payloads/ItemRepPayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ItemBuilder from '../Factories/ItemBuilder';

class SaveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ItemRepPayload): Promise<IItemDomain>
    {
        const item: IItemDomain = new ItemBuilder(payload)
            .setItem()
            .build()
            .create();

        return await this.repository.save(item);
    }
}

export default SaveItemUseCase;
