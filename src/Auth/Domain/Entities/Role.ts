import IRoleDomain from './IRoleDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import RoleRepPayload from '../Payloads/Role/RoleRepPayload';
import AuthHelper from '../../../Shared/Helpers/AuthHelper';

class Role extends Base implements IRoleDomain
{
    name: string;
    permissions: string[];

    constructor(payload: RoleRepPayload)
    {
        super();
        this._id = payload?._id ?? this._id;
        this.updateBuild(payload);
    }

    updateBuild(payload: RoleRepPayload): void
    {
        AuthHelper.validatePermissions(payload.permissions);

        this.name = payload?.name;
        this.permissions = payload?.permissions;
    }
}

export default Role;
