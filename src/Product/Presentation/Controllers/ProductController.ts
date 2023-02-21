import IProductDomain from '../../Domain/Entities/IProductDomain';

import SaveProductUseCase from '../../Domain/UseCases/SaveProductUseCase';
import ListProductsUseCase from '../../Domain/UseCases/ListProductsUseCase';
import GetProductUseCase from '../../Domain/UseCases/GetProductUseCase';
import RemoveProductUseCase from '../../Domain/UseCases/RemoveProductUseCase';
import UpdateProductUseCase from '../../Domain/UseCases/UpdateProductUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ProductUpdatePayload from '../../Domain/Payloads/ProductUpdatePayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ProductSchemaSaveValidation from '../Validations/ProductSchemaSaveValidation';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import ProductFilter from '../Criterias/ProductFilter';
import ProductSort from '../Criterias/ProductSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import ProductSchemaUpdateValidation from '../Validations/ProductSchemaUpdateValidation';

class ProductController
{
    public async save(payload: ProductRepPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(ProductSchemaSaveValidation, payload);

        const useCase = new SaveProductUseCase();
        return await useCase.handle(payload);
    }

    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new ProductFilter(payload.query),
                sort: new ProductSort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListProductsUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async getOne(payload: IdPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetProductUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: ProductUpdatePayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(ProductSchemaUpdateValidation, payload);

        const useCase = new UpdateProductUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new RemoveProductUseCase();
        return await useCase.handle(payload);
    }
}

export default ProductController;
