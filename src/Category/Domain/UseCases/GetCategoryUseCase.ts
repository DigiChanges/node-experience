import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import { REPOSITORIES } from '../../../Config/Injects';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ICategoryRepository from '../../Infraestructure/Repositories/ICategoryRepository';
import ICategoryDomain from '../Entities/ICategoryDomain';

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
        const { id } = payload;
        return await this.repository.getOne(id);
    }
}

export default GetCategoryUseCase;
