import SaveProductUseCase from '../../Domain/UseCases/SaveProductUseCase';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import GetProductUseCase from '../../Domain/UseCases/GetProductUseCase';

class ProductController
{
    public async save(payload: ProductRepPayload): Promise<any>
    {
        // validar
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
