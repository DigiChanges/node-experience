import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import IProductTransformer from './IProductTransformer';
import UserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/UserMinimalDataTransformer';


class ProductTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(Product: IProductDomain): Promise<IProductTransformer>
    {
        const createdBy = Product.createdBy;
        const lastModifiedBy = Product.lastModifiedBy;
        dayjs.extend(utc);

        return {
            id: Product.getId(),
            title: Product.title,
            price: Product.price,
            enable: Product.enable,
            category: Product.category,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: dayjs(Product.createdAt).utc().unix(),
            updatedAt: dayjs(Product.updatedAt).utc().unix()
        };
    }
}

export default ProductTransformer;
