import SaveProductUseCase from '../../Domain/UseCases/SaveProductUseCase';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import ListProductUseCase from '../../Domain/UseCases/ListProductUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import ProductRepSchemaValidation from '../Validations/ProductRepSchemaValidation';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RemoveProductUseCase from '../../Domain/UseCases/RemoveProductUseCase';
import ProductUpdateSchemaValidation from '../Validations/ProductUpdateSchemaValidation';
import ProductUpdatePayload from '../../Domain/Payloads/ProductUpdatePayload';
import UpdateProductUseCase from '../../Domain/UseCases/UpdateProductUseCase';
import GetProductUseCase from '../../Domain/UseCases/GetProductUseCase';

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
        const useCase = new ListProductUseCase();
        const allProducts = useCase.handle();
        return allProducts;
    }

    public async getOne(payload: IdPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);
        const useCase = new GetProductUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);
        const useCase = new RemoveProductUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: ProductUpdatePayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(ProductUpdateSchemaValidation, payload);

        const useCase = new UpdateProductUseCase();
        return await useCase.handle(payload);
    }
}

export default ProductController;
