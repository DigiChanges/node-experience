import UserAssignRoleBySlugPayload from '../../../Domain/Payloads/User/UserAssignRoleBySlugPayload';

class UserAssignRoleByCommandRequest implements UserAssignRoleBySlugPayload
{
    private readonly _slug: string;
    private readonly _email: string;

    constructor(env: any)
    {
        this._slug = env.slug;
        this._email = env.email;
    }

    get slugRole(): string
    {
        return this._slug;
    }

    get email(): string
    {
        return this._email;
    }
}

export default UserAssignRoleByCommandRequest;
