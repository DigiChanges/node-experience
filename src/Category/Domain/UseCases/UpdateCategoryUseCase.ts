import CategoryUpdatePayload from '../../Domain/Payloads/CategoryUpdatePayload';
import ICategoryRepository from '../../Infraestructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ICategoryDomain from '../Entities/ICategoryDomain';

class UpdateCategoryUseCase
{
    private repository: ICategoryRepository;
    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: CategoryUpdatePayload): Promise<ICategoryDomain>
    {
        const { id } = payload;
        const category = await this.repository.getOne(id);
        category.updateBuild(payload);
        const data = await this.repository.update(category);
        return data;
    }
}

export default UpdateCategoryUseCase;
