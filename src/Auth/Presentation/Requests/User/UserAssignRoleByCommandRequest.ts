import { IsString } from 'class-validator';
import UserAssignRoleBySlug from '../../../Domain/Payloads/User/UserAssignRoleBySlug';

class UserAssignRoleByCommandRequest implements UserAssignRoleBySlug
{
    private readonly _slug: string;
    private readonly _email: string;

    constructor(env: any)
    {
        this._slug = env.slug;
        this._email = env.email;
    }

    @IsString()
    get slugRole(): string
    {
        return this._slug;
    }

    @IsString()
    get email(): string
    {
        return this._email;
    }
}

export default UserAssignRoleByCommandRequest;
