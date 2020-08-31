import UserRepPayload from "../../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import IRoleDomain from "../../../../InterfaceAdapters/IDomain/IRoleDomain";
import {IsArray, IsBoolean, IsString} from "class-validator";

class UserCommandRepRequest implements UserRepPayload
{
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    passwordConfirmation: string;

    @IsBoolean()
    enable: boolean;

    @IsArray()
    @IsString({
        each: true,
    })
    permissions: string[];

    @IsArray()
    roles: IRoleDomain[];

    @IsBoolean()
    isSuperAdmin: boolean;

    constructor(env: any, role: any = null)
    {
        this.firstName = env.firstName;
        this.firstName = env.lastName;
        this.firstName = env.password;
        this.enable = true;
        this.roles = role ? [role] : [];
        this.isSuperAdmin = env.isSuperAdmin;
    }

    getFirstName(): string
    {
        return this.firstName;
    }

    getLastName(): string
    {
        return this.lastName;
    }

    getEmail(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }

    getPasswordConfirmation(): string
    {
        return this.password;
    }

    getEnable(): boolean
    {
        return this.enable;
    }

    getConfirmationToken(): null
    {
        return null;
    }

    getPasswordRequestedAt(): null
    {
        return null;
    }

    getRoles(): IRoleDomain[]
    {
        return this.roles;
    }

    getPermissions(): string[]
    {
        return [];
    }

    getIsSuperAdmin(): boolean
    {
        return this.isSuperAdmin;
    }
}

export default UserCommandRepRequest;