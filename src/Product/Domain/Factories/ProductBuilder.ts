import Product from '../Entities/Product';
import ProductRepPayload from '../Payloads/ProductRepPayload';
import IProductDomain from '../Entities/IProductDomain';

class ProductBuilder
{
    private _product: IProductDomain;
    private _payload: ProductRepPayload;

    constructor(payload?: ProductRepPayload)
    {
        this._payload = payload;
    }

    setProduct(product?: IProductDomain)
    {
        this._product = product ?? new Product();

        return this;
    }

    build()
    {
        this._product.title = this._payload.title;
        this._product.price = this._payload.price;
        this._product.enable = this._payload.enable;
        this._product.category = this._payload.category;


        return this;
    }

    update()
    {
        return this._product;
    }

    create()
    {
        return this._product;
    }
}

export default ProductBuilder;
