import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import RoleRepPayload from '../Payloads/Role/RoleRepPayload';

interface IRoleDomain extends IBaseDomain, RoleRepPayload
{
    updateBuild(payload: RoleRepPayload): void
}

export default IRoleDomain;
