import ProductRepPayload from '../../../Domain/Payloads/Product/ProductRepPayload';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { decorate } from 'ts-mixer';

class ProductRepRequest implements ProductRepPayload
{
    private readonly _title: string;
    private readonly _price: number;
    private readonly _active: boolean;

    constructor(data: Record<string, any>)
    {
        this._title = data.title;
        this._price = data.price;
        this._active = data.active ?? true;
    }

    @decorate(IsString())
    get title(): string
    {
        return this._title;
    }

    @decorate(IsNumber())
    get price(): number
    {
        return this._price;
    }

    @decorate(IsOptional())
    @decorate(IsBoolean())
    get active(): boolean
    {
        return this._active;
    }
}

export default ProductRepRequest;
