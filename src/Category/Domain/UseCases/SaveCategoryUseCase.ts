import CategoryBuilder from '../../../Category/Domain/Factories/CategoryBuilder';
import ICategoryRepository from '../../../Category/Infrastructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ICategoryDomain from '../Entities/ICategoryDomain';
import CategoryRepPayload from '../Payloads/CategoryRepPayload';

class SaveCategoryUseCase
{
    private repository: ICategoryRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: CategoryRepPayload): Promise<ICategoryDomain>
    {
        const category: ICategoryDomain = new CategoryBuilder(payload)
            .setCategory()
            .build()
            .create();

        return await this.repository.save(category);
    }
}

export default SaveCategoryUseCase;
