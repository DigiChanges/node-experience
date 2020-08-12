import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import {ObjectID} from "mongodb";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

class User implements IUserDomain
{
    _id: ObjectID;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: IRoleDomain[];
    permissions: string[];
    enable: boolean;
    isSuperAdmin: boolean;
    confirmationToken: string ;
    passwordRequestedAt: Date ;
    createdAt: Date;
    updatedAt: Date;

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
        const find = this.roles.find((_role) => _role.getId().toString() === role.getId().toString() );

        if (!find)
        {
            this.roles.push(role);
        }
    }

    getRoles(): IRoleDomain[]
    {
        return this.roles;
    }

    getId(): ObjectID
    {
        return this._id;
    }
}

export default User;