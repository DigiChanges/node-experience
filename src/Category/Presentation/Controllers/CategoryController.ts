import SaveCategoryUseCase from '../../Domain/UseCases/SaveCategoryUseCase';
import CategoryRepPayload from '../../Domain/Payloads/CategoryRepPayload';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import CategoryUpdatePayload from '../../Domain/Payloads/CategoryUpdatePayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ListCategoryUseCase from '../../Domain/UseCases/ListCategoryUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import CategoryRepSchemaValidation from '../Validations/CategoryRepSchemaValidation';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RemoveCategoryUseCase from '../../Domain/UseCases/RemoveCategoryUseCase';
import CategoryUpdateSchemaValidation from '../Validations/CategoryUpdateSchemaValidation';
import UpdateCategoryUseCase from '../../Domain/UseCases/UpdateCategoryUseCase';
import GetCategoryUseCase from '../../Domain/UseCases/GetCategoryUseCase';


class CategoryController
{
    public async save(payload: CategoryRepPayload): Promise<any>
    {
        await ValidatorSchema.handle(CategoryRepSchemaValidation, payload);
        const useCase = new SaveCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async list(): Promise<ICategoryDomain[]>
    {
        const useCase = new ListCategoryUseCase();
        const allCategory = useCase.handle();
        return allCategory;
    }

    public async getOne(payload: IdPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);
        const useCase = new GetCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);
        const useCase = new RemoveCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: CategoryUpdatePayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(CategoryUpdateSchemaValidation, payload);

        const useCase = new UpdateCategoryUseCase();
        return await useCase.handle(payload);
    }
}

export default CategoryController;
