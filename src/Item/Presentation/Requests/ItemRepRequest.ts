import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import { IsInt, IsString } from 'class-validator';
import { decorate } from 'ts-mixer';

class ItemRepRequest implements ItemRepPayload
{
    private readonly _name: string;
    private readonly _type: number;

    constructor(data: Record<string, any>)
    {
        this._name = data.name;
        this._type = data.type;
    }

    @decorate(IsString())
    get name(): string
    {
        return this._name;
    }

    @decorate(IsInt())
    get type(): number
    {
        return this._type;
    }
}

export default ItemRepRequest;
