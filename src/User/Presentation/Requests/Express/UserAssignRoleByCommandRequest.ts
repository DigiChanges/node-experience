import { IsString } from 'class-validator';
import UserAssignRoleByPayload from '../../../InterfaceAdapters/Payloads/UserAssignRoleByPayload';

class UserAssignRoleByCommandRequest implements UserAssignRoleByPayload
{
    @IsString()
    private readonly slug: string;

    @IsString()
    private readonly email: string;

    constructor(env: any)
    {
        this.slug = env.slug;
        this.email = env.email;
    }

    get_slug_role(): string
    {
        return this.slug;
    }

    get_email(): string
    {
        return this.email;
    }
}

export default UserAssignRoleByCommandRequest;
