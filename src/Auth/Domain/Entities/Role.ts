import IRoleDomain from './IRoleDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import RoleRepPayload from '../Payloads/Role/RoleRepPayload';
import AuthHelper from '../../../Shared/Helpers/AuthHelper';

class Role extends Base implements IRoleDomain
{
    name: string;
    slug: string;
    enable: boolean;
    ofSystem: boolean;
    permissions: string[];

    constructor(payload: RoleRepPayload)
    {
        super();
        this.updateBuild(payload);
    }

    updateBuild(payload: RoleRepPayload): void
    {
        AuthHelper.validatePermissions(payload?.permissions ?? []);

        this.name = payload?.name;
        this.slug = payload?.slug;
        this.enable = payload?.enable;
        this.permissions = payload?.permissions;
    }
}

export default Role;
