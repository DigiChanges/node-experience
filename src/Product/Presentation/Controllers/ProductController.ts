import IProductDomain from '../../../Product/Domain/Entities/IProductDomain';
import ProductRepPayload from '../../../Product/Domain/Payloads/ProductRepPayload';
import ProductUpdatePayload from '../../../Product/Domain/Payloads/ProductUpdatePayload';
import GetProductUseCase from '../../../Product/Domain/UseCases/GetProductUseCase';
import ListProductUseCase from '../../../Product/Domain/UseCases/ListProductUseCase';
import RemoveProductUseCase from '../../../Product/Domain/UseCases/RemoveProductUseCase';
import SaveProductUseCase from '../../../Product/Domain/UseCases/SaveProductUseCase';
import UpdateProductUseCase from '../../../Product/Domain/UseCases/UpdateProductUseCase';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import ProductFilter from '../Criterias/ProductFilter';
import ProductSort from '../Criterias/ProductSort';
import ProductSchemaSaveValidation from '../Validations/ProductSchemaSaveValidation';
import ProductSchemaUpdateValidation from '../Validations/ProductSchemaUpdateValidation';

class ProductController {
  public async save(payload: ProductRepPayload): Promise<IProductDomain> {
    await ValidatorSchema.handle(ProductSchemaSaveValidation, payload);

    const useCase = new SaveProductUseCase();
    return await useCase.handle(payload);
  }

  public async list(payload: CriteriaPayload): Promise<IPaginator> {
    await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

    const requestCriteria: ICriteria = new RequestCriteria({
      filter: new ProductFilter(payload.query),
      sort: new ProductSort(payload.query),
      pagination: new Pagination(payload.query, payload.url),
    });

    const useCase = new ListProductUseCase();
    return await useCase.handle(requestCriteria);
  }

  public async getOne(payload: IdPayload): Promise<IProductDomain> {
    await ValidatorSchema.handle(IdSchemaValidation, payload);

    const useCase = new GetProductUseCase();
    return await useCase.handle(payload);
  }

  public async update(payload: ProductUpdatePayload): Promise<IProductDomain> {
    await ValidatorSchema.handle(ProductSchemaUpdateValidation, payload);

    const useCase = new UpdateProductUseCase();
    return await useCase.handle(payload);
  }

  public async remove(payload: IdPayload): Promise<IProductDomain> {
    await ValidatorSchema.handle(IdSchemaValidation, payload);

    const useCase = new RemoveProductUseCase();
    return await useCase.handle(payload);
  }
}

export default ProductController;
