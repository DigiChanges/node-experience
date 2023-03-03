import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import IUserDomain from './IUserDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import UserRepPayload from '../Payloads/User/UserRepPayload';

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
    passwordRequestedAt?: Date;

    constructor(payload: UserRepPayload)
    {
        super();
        this.updateRep(payload);
    }

    updateRep(payload: UserRepPayload)
    {
        this.firstName = payload?.firstName ?? this.firstName;
        this.lastName = payload?.lastName ?? this.lastName;
        this.email = payload?.email ?? this.email;
        this.birthday = payload?.birthday ?? this.birthday;
        this.documentType = payload?.documentType ?? this.documentType;
        this.documentNumber = payload?.documentNumber ?? this.documentNumber;
        this.gender = payload?.gender ?? this.gender;
        this.phone = payload?.phone ?? this.phone;
        this.country = payload?.country ?? this.country;
        this.address = payload?.address ?? this.address;
        this.enable = payload?.enable !== undefined || payload?.enable !== null ? payload?.enable : this.enable;
        this.roles = payload?.roles ?? this.roles;
        this.permissions = payload?.permissions ?? this.permissions;
        this.passwordRequestedAt = payload?.passwordRequestedAt ?? this.passwordRequestedAt ?? null;
        this.isSuperAdmin = this.isSuperAdmin ?? payload?.isSuperAdmin ?? this.isSuperAdmin;
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
