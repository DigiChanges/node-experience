import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

class ListItemsUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListItemsUseCase;
