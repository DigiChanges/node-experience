import IRoleDomain from './IRoleDomain';
import RoleRepPayload from './Payloads/RoleRepPayload';
import RoleUpdatePayload from './Payloads/RoleUpdatePayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface IRoleService
{
    persist(role: IRoleDomain, payload: RoleRepPayload): Promise<IRoleDomain>;
    create(payload: RoleRepPayload): Promise<IRoleDomain>;
    update(payload: RoleUpdatePayload): Promise<IRoleDomain>;
    getOne(id: string): Promise<IRoleDomain>;
    remove(id: string): Promise<IRoleDomain>;
    list(payload: ICriteria): Promise<IPaginator>;
}

export default IRoleService;