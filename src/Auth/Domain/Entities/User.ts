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
    birthdate: string;
    genre: string;
    phone: string;
    country: string;
    password: Password;
    roles: IRoleDomain[];
    enable: boolean;
    verify: boolean;

    constructor(payload: UserRepPayload)
    {
        super();
        this._id = payload?._id ?? this._id;
        this.updateRep(payload);
    }

    updateRep(payload: UserRepPayload)
    {
        this.firstName = payload?.firstName ?? this.firstName;
        this.lastName = payload?.lastName ?? this.lastName;
        this.email = payload?.email ?? this.email;
        this.birthdate = payload?.birthdate ?? this.birthdate;
        this.genre = payload?.genre ?? this.genre;
        this.phone = payload?.phone ?? this.phone;
        this.country = payload?.country ?? this.country;
        this.enable = payload?.enable !== undefined || payload?.enable !== null ? payload?.enable : this.enable;
        this.roles = payload?.roles ?? this.roles;
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
