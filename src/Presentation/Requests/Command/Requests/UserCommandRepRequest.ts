import UserRepPayload from "../../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import IRoleDomain from "../../../../InterfaceAdapters/IDomain/IRoleDomain";

class UserCommandRepRequest implements UserRepPayload
{
    private env: any;
    private readonly role: any;

    constructor(env: any, role: any = null)
    {
        this.env = env;
        this.role = role;
    }

    firstName(): string
    {
        return this.env.firstName;
    }

    lastName(): string
    {
        return this.env.lastName;
    }

    email(): string
    {
        return this.env.email;
    }

    password(): string
    {
        return this.env.password;
    }

    passwordConfirmation(): string
    {
        return this.env.password;
    }

    enable(): boolean
    {
        return true;
    }

    confirmationToken(): null
    {
        return null;
    }

    passwordRequestedAt(): null
    {
        return null;
    }

    roles(): IRoleDomain[]
    {
        return this.role ? [this.role] : [];
    }

    permissions(): string[]
    {
        return [];
    }

    isSuperAdmin(): boolean
    {
        return this.env.isSuperAdmin;
    }
}

export default UserCommandRepRequest;