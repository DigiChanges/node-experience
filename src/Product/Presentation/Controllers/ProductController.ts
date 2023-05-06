import SaveProductUseCase from '../../Domain/UseCases/SaveProductUseCase';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';

class ProductController
{
    public async save(payload: ProductRepPayload): Promise<any>
    {
        // validar
        const useCase = new SaveProductUseCase();
        return await useCase.handle(payload);
    }

    /* public async list(): Promise<IProductDomain[]>
    {
        const useCase = new GetProductUseCase();
        const allCategory = useCase.handle();
        return allCategory;
    } */
}

export default ProductController;
