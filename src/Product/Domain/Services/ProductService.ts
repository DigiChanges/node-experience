
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ProductSavePayload from '../Payloads/ProductSavePayload';
import IProductRepository from '../../Infraestructure/Repositories/IProductRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Product from '../Entities/Product';
import IProductDomain from '../Entities/IProductDomain';
import ICategoryRepository from '../../../Category/Infraestructure/Repositories/ICategoryRepository';

class ProductService
{
    private repository: IProductRepository;
    private repositoryCategory: ICategoryRepository;
    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
        this.repositoryCategory = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async create(payload: ProductSavePayload): Promise<Product>
    {
        const product = new Product(payload);
        await this.repository.save(product);
        return product;
    }

    async list(): Promise<IProductDomain[]>
    {
        return await this.repository.list();
    }
}

export default ProductService;
