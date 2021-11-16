import { IsString } from 'class-validator';
import UserAssignRoleBySlug from '../../InterfaceAdapters/Payloads/UserAssignRoleBySlug';

class UserAssignRoleByCommandRequest implements UserAssignRoleBySlug
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

    getSlugRole(): string
    {
        return this.slug;
    }

    getEmail(): string
    {
        return this.email;
    }
}

export default UserAssignRoleByCommandRequest;
