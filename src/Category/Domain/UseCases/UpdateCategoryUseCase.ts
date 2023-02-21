import CategoryUpdatePayload from '../Payloads/CategoryUpdatePayload';
import ICategoryDomain from '../Entities/ICategoryDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import ICategoryRepository from '../../Infrastructure/Repositories/ICategoryRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import CategoryBuilder from '../Factories/CategoryBuilder';

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
        let category: ICategoryDomain = await this.repository.getOne(payload.id);

        category = new CategoryBuilder(payload)
            .setCategory(category)
            .build()
            .update();

        return await this.repository.update(category);
    }
}

export default UpdateCategoryUseCase;
