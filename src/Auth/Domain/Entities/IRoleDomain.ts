import { IBaseDomain } from '@digichanges/shared-experience';
import RoleRepPayload from '../Payloads/Role/RoleRepPayload';

interface IRoleDomain extends IBaseDomain, RoleRepPayload
{
    updateBuild(payload: RoleRepPayload): void
}

export default IRoleDomain;
