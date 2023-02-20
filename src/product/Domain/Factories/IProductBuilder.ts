import Product from '../Entities/Product';
import ProductRepPayload from '../Payloads/IProductRepPayload';
import IProductDomain from '../Entities/IProductDomain';

class ProductBuilder
{
    private _Product: IProductDomain;
    private _payload: ProductRepPayload;

    constructor(payload?: ProductRepPayload)
    {
        this._payload = payload;
    }

    setProduct(product?: IProductDomain)
    {
        this._Product = product ?? new Product();

        return this;
    }

    build()
    {
        this._Product.title = this._payload.title;
        this._Product.price = this._payload.price;
        this._Product.enable = this._payload.enable;
        this._Product.category = this._payload.category;

        return this;
    }

    update()
    {
        this._Product.lastModifiedBy = this._payload.createdBy;

        return this._Product;
    }

    create()
    {
        this._Product.createdBy = this._payload.createdBy;
        this._Product.lastModifiedBy = this._payload.createdBy;

        return this._Product;
    }
}

export default ProductBuilder;
