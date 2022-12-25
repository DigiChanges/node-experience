import IRoleDomain from './IRoleDomain';
import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import UserRepPayload from '../Payloads/User/UserRepPayload';

interface IUserDomain extends IBaseDomain, UserRepPayload
{
    password: Password;

    updateRep(payload: UserRepPayload): void;
    getFullName(): string;
    setRole(role: IRoleDomain): void;
    getRoles(): IRoleDomain[];
    clearRoles(): void;
}

export default IUserDomain;
