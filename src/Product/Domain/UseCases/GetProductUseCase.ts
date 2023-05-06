import IProductDomain from '../Entities/IProductDomain';
import ProductService from '../Services/ProductService';

class GetProductUseCase
{
    private productService: ProductService;
    constructor()
    {
        this.productService = new ProductService();
    }

    async handle(): Promise<IProductDomain[]>
    {
        const product: IProductDomain[] = await this.productService.list();
        return product;
    }
}

export default GetProductUseCase;
