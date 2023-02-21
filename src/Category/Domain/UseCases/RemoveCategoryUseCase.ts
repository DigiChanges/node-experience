import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ICategoryDomain from '../Entities/ICategoryDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import ICategoryRepository from '../../Infrastructure/Repositories/ICategoryRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

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
