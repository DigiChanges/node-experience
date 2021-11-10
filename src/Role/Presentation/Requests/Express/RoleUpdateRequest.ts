import { decorate, Mixin } from 'ts-mixer';
import RoleUpdatePayload from '../../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import RoleRepRequest from './RoleRepRequest';
import { IsString, Length } from 'class-validator';
import { Unique } from '../../../../Shared/Decorators/unique';
import { REPOSITORIES } from '../../../../repositories';

class RoleUpdateRequest extends Mixin(RoleRepRequest, IdRequest) implements RoleUpdatePayload
{
    @decorate(Length(3, 30))
    @decorate(IsString())
    @decorate(Unique({
        repository: REPOSITORIES.IRoleRepository,
        refAttr: 'id'
    }))
    slug: string;

    constructor(data: Record<string, any>, id: string)
    {
        super(data);
        this.id = id;
        this.slug = data.slug;
    }

    getSlug(): string
    {
        return this.slug;
    }
}

export default RoleUpdateRequest;
