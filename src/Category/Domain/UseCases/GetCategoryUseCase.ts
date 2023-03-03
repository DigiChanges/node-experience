import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ICategoryDomain from '../Entities/ICategoryDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import ICategoryRepository from '../../Infrastructure/Repositories/ICategoryRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class GetCategoryUseCase
{
    private repository: ICategoryRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: IdPayload): Promise<ICategoryDomain>
    {
        return await this.repository.getOne(payload.id);
    }
}

export default GetCategoryUseCase;
