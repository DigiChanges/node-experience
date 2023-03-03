import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';

import SaveCategoryUseCase from '../../Domain/UseCases/SaveCategoryUseCase';
import GetCategoryUseCase from '../../Domain/UseCases/GetCategoryUseCase';
import RemoveCategoryUseCase from '../../Domain/UseCases/RemoveCategoryUseCase';
import UpdateCategoryUseCase from '../../Domain/UseCases/UpdateCategoryUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import CategoryRepPayload from '../../Domain/Payloads/CategoryRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import CategoryUpdatePayload from '../../Domain/Payloads/CategoryUpdatePayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import CategoryFilter from '../Criterias/CategoryFilter';
import CategorySort from '../Criterias/CategorySort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import ListCategoryUseCase from '../../Domain/UseCases/ListCategoryUseCase';
import CategorySchemaSaveValidation from '../Validations/CategorySchemaSaveValidation';
import CategorySchemaUpdateValidation from '../Validations/CategorySchemaUpdateValidation';

class CategoryController
{
    public async save(payload: CategoryRepPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(CategorySchemaSaveValidation, payload);

        const useCase = new SaveCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new CategoryFilter(payload.query),
                sort: new CategorySort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListCategoryUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async getOne(payload: IdPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: CategoryUpdatePayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(CategorySchemaUpdateValidation, payload);

        const useCase = new UpdateCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new RemoveCategoryUseCase();
        return await useCase.handle(payload);
    }
}

export default CategoryController;
