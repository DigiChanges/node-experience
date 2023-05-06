import SaveCategoryUseCase from '../../Domain/UseCases/SaveCategoryUseCase';
import CategoryRepPayload from '../../Domain/Payloads/CategoryRepPayload';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import GetCategoryUseCase from '../../Domain/UseCases/GetCategoryUseCase';

class CategoryController
{
    public async save(payload: CategoryRepPayload): Promise<any>
    {
        // validar
        const useCase = new SaveCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async list(): Promise<ICategoryDomain[]>
    {
        const useCase = new GetCategoryUseCase();
        const allCategory = useCase.handle();
        return allCategory;
    }
}

export default CategoryController;
