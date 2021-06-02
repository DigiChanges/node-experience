import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import Base from '../../../App/Domain/Entities/Base';

class User extends Base implements IUserDomain
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

    getFullName(): string
    {
        return `${this.firstName} ${this.lastName}`;
    }

    clearRoles(): void
    {
        this.roles = [];
    }

    setRole(role: IRoleDomain): void
    {
        const find = this.roles.find((_role) => _role.getId().toString() === role.getId().toString());

        if (!find)
        {
            this.roles.push(role);
        }
    }

    getRoles(): IRoleDomain[]
    {
        return this.roles;
    }
}

export default User;
