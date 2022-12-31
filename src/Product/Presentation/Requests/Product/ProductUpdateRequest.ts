import { Mixin } from 'ts-mixer';
import ProductUpdatePayload from '../../../Domain/Payloads/Product/ProductUpdatePayload';
import IdRequest from '../../../../Shared/Presentation/Requests/IdRequest';
import ProductRepRequest from './ProductRepRequest';

class ProductUpdateRequest extends Mixin(ProductRepRequest, IdRequest) implements ProductUpdatePayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default ProductUpdateRequest;
