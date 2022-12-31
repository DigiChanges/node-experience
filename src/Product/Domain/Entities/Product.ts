import IProductDomain from './IProductDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import ProductRepPayload from '../Payloads/Product/ProductRepPayload';

class Product extends Base implements IProductDomain
{
    price: number;
    title: string;
    active: boolean;

    constructor(payload: ProductRepPayload)
    {
        super();
        this.updateRep(payload);
    }

    updateRep(payload: ProductRepPayload)
    {
        this.price = payload?.price ?? this.price;
        this.title = payload?.title ?? this.title;
        this.active = payload?.active ?? this.active;
    }
}

export default Product;
