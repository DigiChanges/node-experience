import UserRepPayload from "../../Payloads/Users/UserRepPayload";
import Role from "../../Entities/Role";

class UserCommandRepRequest implements UserRepPayload
{
    private env: any;
    private readonly role: Role;

    constructor(env: any, role: Role = null)
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

    roles(): any[]
    {
        let roles = [];

        if (this.role)
        {
            roles.push(this.role._id);
        }

        return roles;
    }

    permissions(): any[]
    {
        return [];
    }
}

export default UserCommandRepRequest;