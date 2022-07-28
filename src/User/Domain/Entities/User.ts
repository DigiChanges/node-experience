import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';
import IUserDomain from './IUserDomain';
import Base from '../../../App/Domain/Entities/Base';
import Password from '../../../App/Domain/ValueObjects/Password';
import UserRepPayload from '../Payloads/UserRepPayload';

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
    verify: boolean;
    isSuperAdmin: boolean;
    confirmationToken?: string;
    passwordRequestedAt?: Date;

    constructor(payload: UserRepPayload)
    {
        super();
        this.updateRep(payload);
    }

    updateRep(payload: UserRepPayload)
    {
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.email = payload.email;
        this.birthday = payload.birthday;
        this.documentType = payload.documentType;
        this.documentNumber = payload.documentNumber;
        this.gender = payload.gender;
        this.phone = payload.phone;
        this.country = payload.country;
        this.address = payload.address;
        this.verify = this.verify ?? payload.verify ?? false;
        this.enable = this.enable ?? payload.enable;
        this.roles = payload.roles;
        this.permissions = payload.permissions;
        this.confirmationToken = payload.confirmationToken ?? null;
        this.passwordRequestedAt = payload.passwordRequestedAt ?? null;
        this.isSuperAdmin = this.isSuperAdmin ?? payload.isSuperAdmin;
    }

    setPassword(value: Password)
    {
        this.password = value;
    }

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
        const find = this.getRoles().find((_role) => _role.getId().toString() === role.getId().toString());

        if (!find)
        {
            this.roles.push(role);
        }
    }

    getRoles(): IRoleDomain[]
    {
        if (this.roles.find)
        {
            return this.roles ?? [];
        }

        // @ts-ignore
        return this.roles.getItems() ?? [];
    }
}

export default User;
