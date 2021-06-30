import ItemUpdatePayload from '../../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import {IsInt, IsString} from 'class-validator';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import IReqDTO from '../../../../Shared/InterfaceAdapters/IReqDTO';

class ItemUpdateRequest extends IdRequest implements ItemUpdatePayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    constructor({params: {id}, body}: IReqDTO)
    {
        super(id);
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

export default ItemUpdateRequest;
