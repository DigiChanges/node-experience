import CategoryRepPayload from '../Payloads/CategoryRepPayload';
import ICategoryDomain from '../Entities/CategoryDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import ICategoryRepository from '../../Infrastructure/Repositories/ICategoryRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import CategoryBuilder from '../Factories/CategoryBuilder';

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
        const Category: ICategoryDomain = new CategoryBuilder(payload)
            .setCategory()
            .build()
            .create();

        return await this.repository.save(Category);
    }
}

export default SaveCategoryUseCase;
