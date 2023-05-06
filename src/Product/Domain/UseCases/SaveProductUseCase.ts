import IProductDomain from '../Entities/IProductDomain';
import ProductSavePayload from '../Payloads/ProductSavePayload';
import ProductService from '../Services/ProductService';

class SaveProductUseCase
{
    private productService: ProductService;
    constructor()
    {
        this.productService = new ProductService();
    }

    async handle(payload: ProductSavePayload): Promise<IProductDomain>
    {
        const product: IProductDomain = await this.productService.create(payload);
        return product;
    }
}

export default SaveProductUseCase;
