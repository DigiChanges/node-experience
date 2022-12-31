import IProductDomain from '../../Entities/IProductDomain';
import ProductSavePayload from '../../Payloads/Product/ProductSavePayload';
import ProductService from '../../Services/ProductService';

class ProductSaveUseCase
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

export default ProductSaveUseCase;
