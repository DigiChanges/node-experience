import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";
import { v4 as uuidv4 } from 'uuid';

class User implements IUserDomain
{
    _id: string;
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

    constructor()
    {
        this._id = uuidv4();
    }

    getFullName = (): string =>
    {
        return `${this.firstName} ${this.lastName}`;
    }

    clearRoles = (): void =>
    {
        this.roles = [];
    }

    setRole = (role: IRoleDomain): void =>
    {
        const find = this.roles.find((_role) => _role.getId().toString() === role.getId().toString());

        if (!find)
        {
            this.roles.push(role);
        }
    }

    getRoles = (): IRoleDomain[] =>
    {
        return this.roles;
    }

    getId = (): string =>
    {
        return this._id;
    }
}

export default User;
