import IProductDomain from '../../Domain/Entities/IProductDomain';
import Product from '../../Domain/Entities/Product';
import IProductRepository from '../Repositories/IProductRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';

class ProductSeed extends BaseSeed
{
    private productRepository: IProductRepository;

    constructor()
    {
        super();
        this.productRepository = this.container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    public async init(): Promise<void>
    {
        const payloadProduct = {
            title: 'Fideo',
            price: 11,
            active: true
        };

        const product: IProductDomain = new Product(payloadProduct);
        await this.productRepository.save(product);

        const payloadProduct2 = {
            title: 'Huevo',
            price: 8,
            active: true
        };

        const product2: IProductDomain = new Product(payloadProduct2);
        await this.productRepository.save(product2);

        const payloadProduct3 = {
            title: 'Dybala',
            price: 19,
            active: false
        };

        const product3: IProductDomain = new Product(payloadProduct3);
        await this.productRepository.save(product3);
    }
}

export default ProductSeed;
