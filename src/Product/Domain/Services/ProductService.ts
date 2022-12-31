import IProductDomain from '../Entities/IProductDomain';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Product from '../Entities/Product';
import ProductSavePayload from '../Payloads/Product/ProductSavePayload';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class ProductService
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async create(payload: ProductSavePayload)
    {
        const product = new Product(payload);

        await this.validate(product);
        await this.repository.save(product);

        return product;
    }

    async getOne(id: string): Promise<IProductDomain>
    {
        return await this.repository.getOne(id);
    }

    async validate(product: IProductDomain): Promise<void>
    {
        return new Promise(resolve => setTimeout(resolve, 1));
    }
}

export default ProductService;
