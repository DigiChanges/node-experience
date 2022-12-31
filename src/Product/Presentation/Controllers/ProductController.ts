import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ProductSaveUseCase from '../../Domain/UseCases/Product/ProductSaveUseCase';
import ProductListUseCase from '../../Domain/UseCases/Product/ProductListUseCase';
import ProductGetUseCase from '../../Domain/UseCases/Product/ProductGetUseCase';
import ProductRemoveUseCase from '../../Domain/UseCases/Product/ProductRemoveUseCase';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import ProductUpdateUseCase from '../../Domain/UseCases/Product/ProductUpdateUseCase';
import ValidatorRequest from '../../../Shared/Presentation/Shared/ValidatorRequest';
import ProductRepPayload from '../../Domain/Payloads/Product/ProductRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ProductUpdatePayload from '../../Domain/Payloads/Product/ProductUpdatePayload';

class ProductController
{
    public async save(request: ProductRepPayload): Promise<IProductDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ProductSaveUseCase();
        return await useCase.handle(request);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ProductListUseCase();
        return await useCase.handle(request);
    }

    public async getOne(request: IdPayload): Promise<IProductDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ProductGetUseCase();
        return await useCase.handle(request);
    }

    public async update(request: ProductUpdatePayload): Promise<IProductDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ProductUpdateUseCase();
        return await useCase.handle(request);
    }

    public async remove(request: IdPayload): Promise<IProductDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ProductRemoveUseCase();
        return await useCase.handle(request);
    }
}

export default ProductController;
