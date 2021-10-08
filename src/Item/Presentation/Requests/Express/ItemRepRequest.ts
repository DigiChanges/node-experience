import ItemRepPayload from '../../../InterfaceAdapters/Payloads/ItemRepPayload';
import { IsInt, IsString } from 'class-validator';
import { decorate } from 'ts-mixer';

class ItemRepRequest implements ItemRepPayload
{
    @decorate(IsString())
    protected name: string;

    @decorate(IsInt())
    protected type: number;

    constructor(data: Record<string, any>)
    {
        this.name = data.name;
        this.type = data.type;
    }

    get_name(): string
    {
        return this.name;
    }

    get_type(): number
    {
        return this.type;
    }
}

export default ItemRepRequest;
