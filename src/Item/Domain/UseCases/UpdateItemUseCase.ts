import ItemUpdatePayload from '../Payloads/ItemUpdatePayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class UpdateItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ItemUpdatePayload): Promise<IItemDomain>
    {
        const item: IItemDomain = await this.repository.getOne(payload.id);
        item.updateBuild(payload);
        item.lastModifiedBy = payload.authUser;

        return await this.repository.update(item);
    }
}

export default UpdateItemUseCase;
