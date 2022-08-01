import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import RoleRepPayload from '../Payloads/RoleRepPayload';

interface IRoleDomain extends IBaseDomain
{
    name: string;
    slug: string;
    enable: boolean;
    ofSystem: boolean;
    permissions: string[];

    updateBuild(payload: RoleRepPayload): void
}

export default IRoleDomain;
