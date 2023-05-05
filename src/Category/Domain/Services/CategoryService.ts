import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import CategorySavePayload from '../Payloads/CategorySavePayload';
import ICategoryRepository from '../../Infraestructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Category from '../Entities/Category';

class CategoryService
{
    private repository: ICategoryRepository;
    constructor()
    {
        const { container } = getRequestContext();
        // this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async create(payload: CategorySavePayload): Promise<Category>
    {
        console.log('Soy service body', payload);
        const category = new Category(payload);
        console.log('soy category transformada', category);
        // await this.repository.save(category);
        return category;
    }
}

export default CategoryService;
