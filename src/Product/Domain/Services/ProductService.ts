import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ProductSavePayload from '../Payloads/ProductSavePayload';
import IProductRepository from '../../Infraestructure/Repositories/IProductRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Product from '../Entities/Product';
import ICategoryRepository from '../../../Category/Infraestructure/Repositories/ICategoryRepository';

class ProductService
{
    private repository: IProductRepository;
    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async create(payload: ProductSavePayload): Promise<Product>
    {
        const product = new Product(payload);
        await this.repository.save(product);
        return product;
    }

    /* async list(): Promise<ICategoryDomain[]>
    {
        const data = await this.repository.list();
        return data;
    } */
}

export default ProductService;
