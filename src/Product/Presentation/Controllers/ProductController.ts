import SaveProductUseCase from '../../Domain/UseCases/SaveProductUseCase';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import GetProductUseCase from '../../Domain/UseCases/GetProductUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import ProductRepSchemaValidation from '../Validations/ProductRepSchemaValidation';

class ProductController
{
    public async save(payload: ProductRepPayload): Promise<any>
    {
        await ValidatorSchema.handle(ProductRepSchemaValidation, payload);
        const useCase = new SaveProductUseCase();
        return await useCase.handle(payload);
    }

    public async list(): Promise<IProductDomain[]>
    {
        const useCase = new GetProductUseCase();
        const allProducts = useCase.handle();
        return allProducts;
    }
}

export default ProductController;
