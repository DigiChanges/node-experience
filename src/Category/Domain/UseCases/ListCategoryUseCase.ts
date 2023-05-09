import ICategoryDomain from '../Entities/ICategoryDomain';
import CategorySavePayload from '../Payloads/CategorySavePayload';
import CategoryService from '../Services/CategoryService';

class ListCategoryUseCase
{
    private categoryService: CategoryService;
    constructor()
    {
        this.categoryService = new CategoryService();
    }

    async handle(): Promise<ICategoryDomain[]>
    {
        const category: ICategoryDomain[] = await this.categoryService.list();
        return category;
    }
}

export default ListCategoryUseCase;
