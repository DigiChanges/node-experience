import ProductUpdatePayload from '../../Payloads/Product/ProductUpdatePayload';
import IProductDomain from '../../Entities/IProductDomain';
import ProductService from '../../Services/ProductService';
import { REPOSITORIES } from '../../../../Config/Injects';
import IProductRepository from '../../../Infrastructure/Repositories/IProductRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

class ProductUpdateUseCase
{
    private productRepository: IProductRepository;
    private productService: ProductService;

    constructor()
    {
        const { container } = getRequestContext();
        this.productRepository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
        this.productService = new ProductService();
    }

    async handle(payload: ProductUpdatePayload): Promise<IProductDomain>
    {
        const { id } = payload;
        const product: IProductDomain = await this.productRepository.getOneBy({ _id: id }, null);

        product.updateRep(payload);
        await this.productService.validate(product);
        await this.productRepository.update(product);

        return product;
    }
}

export default ProductUpdateUseCase;
