import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IProductTransformer from './IProductTransformer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ProductTransformPayload from '../../Domain/Payloads/ProductTransformPayload';

export class ProductTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(payload: ProductTransformPayload): Promise<IProductTransformer>
    {
        dayjs.extend(utc);

        return {
            id: payload._id,
            price: payload.price,
            title: payload.title,
            enable: payload.enable,
            category: payload.category[0]._id,
            createdAt: dayjs(payload.createdAt).utc().unix(),
            updatedAt: dayjs(payload.updatedAt).utc().unix()
        };
    }
}

export default ProductTransformer;
