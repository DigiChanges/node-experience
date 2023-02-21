import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import IProductTransformer from './IProductTransformer';
import UserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/UserMinimalDataTransformer';
import CategoryTransformer from '../../../Category/Presentation/Transformers/CategoryTransformer';

class ProductTransformer extends Transformer
{
    private categoryTransformer: CategoryTransformer;

    constructor()
    {
        super();
        this.categoryTransformer = new CategoryTransformer();
    }

    public async transform(Product: IProductDomain): Promise<IProductTransformer>
    {
        dayjs.extend(utc);

        return {
            id: Product.getId(),
            title: Product.title,
            price: Product.price,
            enable: Product.enable,
            category: await this.categoryTransformer.handle(Product.getCategory()),

            createdAt: dayjs(Product.createdAt).utc().unix(),
            updatedAt: dayjs(Product.updatedAt).utc().unix()

        };
    }
}

export default ProductTransformer;
