import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import {ObjectID} from "mongodb";

class User
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

    setRole(role: IRoleDomain): void
    {
        this.roles.push(role);
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