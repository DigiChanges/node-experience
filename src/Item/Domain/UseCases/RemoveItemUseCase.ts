import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import IItemDomain from '../Entities/IItemDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class RemoveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveItemUseCase;
