import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import Base from '../../../App/Domain/Entities/Base';
import Password from '../../../App/Domain/ValueObjects/Password';

// TODO: check if it is necessary to add a new attribute to know if the user is varified
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
    password: Password;
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
