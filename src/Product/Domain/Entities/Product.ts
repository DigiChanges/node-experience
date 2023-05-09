import Base from '../../../Shared/Domain/Entities/Base';
import ProductRepPayload from '../Payloads/ProductRepPayload';
import IProductDomain from './IProductDomain';

class Product extends Base implements IProductDomain
{
    price: number;
    title: string;
    enable: boolean;
    category: string;

    constructor(payload: ProductRepPayload)
    {
        super();
        this.price = payload.price;
        this.title = payload.title;
        this.enable = payload.enable;
        this.category = payload.category;
    }

    updateBuild(payload: ProductRepPayload): void
    {
        this.price = payload.price;
        this.title = payload.title;
        this.enable = payload.enable;
        this.category = payload.category;
    }
}

export default Product;
