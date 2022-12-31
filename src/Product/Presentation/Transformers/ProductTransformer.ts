import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IProductDomain from '../../Domain/Entities/IProductDomain';
import IProductTransformer from './IProductTransformer';

class ProductTransformer extends Transformer
{
    public async transform(product: IProductDomain): Promise<IProductTransformer>
    {
        dayjs.extend(utc);

        return {
            id: product.getId(),
            title: product.title,
            price: product.price,
            active: product.active,
            createdAt: dayjs(product.createdAt).utc().unix(),
            updatedAt: dayjs(product.updatedAt).utc().unix()
        };
    }
}

export default ProductTransformer;
