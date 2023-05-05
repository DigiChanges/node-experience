import SaveCategoryUseCase from '../../Domain/UseCases/SaveCategoryUseCase';
import CategoryRepPayload from '../../Domain/Payloads/CategoryRepPayload';

class CategoryController
{
    public async save(payload: CategoryRepPayload): Promise<any>
    {
        // validar
        const useCase = new SaveCategoryUseCase();
        return await useCase.handle(payload);
    }
}

export default CategoryController;
