import ICategoryRepository from '../../Infraestructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ICategoryDomain from '../Entities/ICategoryDomain';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';

class RemoveCategoryUseCase
{
    private repository: ICategoryRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: IdPayload): Promise<ICategoryDomain>
    {
        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveCategoryUseCase;
