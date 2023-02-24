import IProductDomain from '../Entities/IProductDomain';
import Product from '../Entities/Product';
import ProductRepPayload from '../Payloads/ProductRepPayload';

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
        this._product.enable = this._payload.enable;

        return this;
    }

    update()
    {
        this._product.lastModifiedBy = this._payload.createdBy;

        return this._product;
    }

    create()
    {
        this._product.createdBy = this._payload.createdBy;
        this._product.lastModifiedBy = this._payload.createdBy;

        return this._product;
    }
}

export default ProductBuilder;
