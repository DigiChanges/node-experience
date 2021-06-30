import ItemRepPayload from '../../../InterfaceAdapters/Payloads/ItemRepPayload';
import {IsInt, IsString} from 'class-validator';
import IReqDTO from '../../../../Shared/InterfaceAdapters/IReqDTO';

class ItemRepRequest implements ItemRepPayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    constructor({body}: IReqDTO)
    {
        this.name = body.name;
        this.type = body.type;
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
