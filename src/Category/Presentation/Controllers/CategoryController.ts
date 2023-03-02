import ICategoryDomain from 'Category/Domain/Entitites/ICategoryDomain';
import CategoryRepPayload from '../../../Category/Domain/Payloads/CategoryRepPayload';
import CategoryUpdatePayload from '../../../Category/Domain/Payloads/CategoryUpdatePayload';
import GetCategoryUseCase from '../../../Category/Domain/UseCases/GetCategoryUseCase';
import ListCategoryUseCase from '../../../Category/Domain/UseCases/ListCategoryUseCase';
import RemoveCategoryUseCase from '../../../Category/Domain/UseCases/RemoveCategoryUseCase';
import UpdateCategoryUseCase from '../../../Category/Domain/UseCases/UpdateCategoryUseCase';
import SaveCategoryUseCase from '../../../Category/Domain/UseCases/SaveCategoryUseCase';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import CategoryFilter from '../Criterias/CategoryFilter';
import CategorySort from '../Criterias/CategorySort';
import CategorySchemaSaveValidation from '../Validations/CategorySchemaSaveValidation';
import CategorySchemaUpdateValidation from '../Validations/CategorySchemaUpdateValidation';

class CategoryController {
  public async save(payload: CategoryRepPayload): Promise<ICategoryDomain> {
    await ValidatorSchema.handle(CategorySchemaSaveValidation, payload);

    const useCase = new SaveCategoryUseCase();
    return await useCase.handle(payload);
  }

  public async list(payload: CriteriaPayload): Promise<IPaginator> {
    await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

    const requestCriteria: ICriteria = new RequestCriteria({
      filter: new CategoryFilter(payload.query),
      sort: new CategorySort(payload.query),
      pagination: new Pagination(payload.query, payload.url),
    });

    const useCase = new ListCategoryUseCase();
    return await useCase.handle(requestCriteria);
  }

  public async getOne(payload: IdPayload): Promise<ICategoryDomain> {
    await ValidatorSchema.handle(IdSchemaValidation, payload);

    const useCase = new GetCategoryUseCase();
    return await useCase.handle(payload);
  }

  public async update(
    payload: CategoryUpdatePayload
  ): Promise<ICategoryDomain> {
    await ValidatorSchema.handle(CategorySchemaUpdateValidation, payload);

    const useCase = new UpdateCategoryUseCase();
    return await useCase.handle(payload);
  }

  public async remove(payload: IdPayload): Promise<ICategoryDomain> {
    await ValidatorSchema.handle(IdSchemaValidation, payload);

    const useCase = new RemoveCategoryUseCase();
    return await useCase.handle(payload);
  }
}

export default CategoryController;
