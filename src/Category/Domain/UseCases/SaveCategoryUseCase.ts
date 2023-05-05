import ICategoryDomain from '../Entities/ICategoryDomain';
import CategorySavePayload from '../Payloads/CategorySavePayload';
import CategoryService from '../Services/CategoryService';

class SaveCategoryUseCase
{
    private categoryService: CategoryService;
    constructor()
    {
        this.categoryService = new CategoryService();
    }

    async handle(payload: CategorySavePayload): Promise<ICategoryDomain>
    {
        const category: ICategoryDomain = await this.categoryService.create(payload);
        return category;
    }
}

export default SaveCategoryUseCase;
