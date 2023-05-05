import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import CategorySavePayload from '../Payloads/CategorySavePayload';
import ICategoryRepository from '../../Infraestructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Category from '../Entities/Category';
import ICategoryDomain from '../Entities/ICategoryDomain';

class CategoryService
{
    private repository: ICategoryRepository;
    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async create(payload: CategorySavePayload): Promise<Category>
    {
        const category = new Category(payload);
        const data = await this.repository.save(category);
        return category;
    }

    async list(): Promise<ICategoryDomain[]>
    {
        const data = await this.repository.list();
        return data;
    }
}

export default CategoryService;
