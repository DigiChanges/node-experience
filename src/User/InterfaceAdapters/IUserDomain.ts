import IRoleDomain from '../../Role/InterfaceAdapters/IRoleDomain';
import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';

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
    password: string;
    roles: IRoleDomain[];
    permissions: string[];
    enable: boolean;
    isSuperAdmin: boolean;
    confirmationToken: string;
    passwordRequestedAt: Date;

    getFullName(): string;
    setRole(role: IRoleDomain): void;
    getRoles(): IRoleDomain[];
    clearRoles(): void;
}

export default IUserDomain;
