import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';
import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import UserRepPayload from '../Payloads/UserRepPayload';

interface IUserDomain extends IBaseDomain
{
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    gender: string;
    phone: string;
    country: string;
    address: string;
    password: Password;
    roles: IRoleDomain[];
    permissions: string[];
    enable: boolean;
    verify: boolean;
    isSuperAdmin: boolean;
    confirmationToken?: string;
    passwordRequestedAt?: Date;

    updateRep(payload: UserRepPayload): void;
    getFullName(): string;
    setRole(role: IRoleDomain): void;
    getRoles(): IRoleDomain[];
    clearRoles(): void;
}

export default IUserDomain;
