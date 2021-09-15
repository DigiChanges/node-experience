import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import {IsInt, IsString} from 'class-validator';

class ItemRepRequest implements ItemRepPayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    constructor({name, type}: any)
    {
        this.name = name;
        this.type = type;
    }

    getName(): string
    {
        return this.name;
    }

    getType(): number
    {
        return this.type;
    }
}

export default ItemRepRequest;
