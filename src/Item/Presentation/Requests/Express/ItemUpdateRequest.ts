import ItemUpdatePayload from '../../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import {IsInt, IsString} from 'class-validator';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';

class ItemUpdateRequest extends IdRequest implements ItemUpdatePayload
{
    @IsString()
    private readonly name: string;

    @IsInt()
    private readonly type: number;

    constructor(data: Record<string, any>, id: string)
    {
        super(id);
        this.name = data.name;
        this.type = data.type;
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
