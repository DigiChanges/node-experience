import IUserDomain from './IUserDomain';
import UserRepPayload from './Payloads/UserRepPayload';
import UserSavePayload from './Payloads/UserSavePayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import ChangeUserPasswordPayload from './Payloads/ChangeUserPasswordPayload';
import UserAssignRolePayload from './Payloads/UserAssignRolePayload';
import UserAssignRoleBySlug from './Payloads/UserAssignRoleBySlug';
import CheckUserRolePayload from './Payloads/CheckUserRolePayload';

interface IUserService
{
    persist(user: IUserDomain, payload: UserRepPayload): Promise<IUserDomain>;
    create(payload: UserSavePayload): Promise<IUserDomain>;
    getOne(id: string): Promise<IUserDomain>;
    remove(id: string): Promise<IUserDomain>;
    list(payload: ICriteria): Promise<IPaginator>;
    persistPassword(user: IUserDomain, payload: ChangeUserPasswordPayload): Promise<IUserDomain>;
    assignRole(payload: UserAssignRolePayload): Promise<IUserDomain>;
    assignRoleBySlug(payload: UserAssignRoleBySlug): Promise<IUserDomain>;
    checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>;
}

export default IUserService;
