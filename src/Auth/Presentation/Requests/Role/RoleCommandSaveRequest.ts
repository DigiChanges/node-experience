import RoleRepPayload from '../../../Domain/Payloads/Role/RoleRepPayload';

class RoleCommandSaveRequest implements RoleRepPayload
{
    private readonly _name: string;
    private readonly _slug: string;
    private readonly _enable: boolean;
    private readonly _permissions: string[];

    constructor(data: Record<string, any>)
    {
        this._name = data.role;
        this._slug = data.slug?.toLowerCase() ?? data.role?.toLowerCase();
        this._enable = data.enable ?? true;
        this._permissions = [];
    }

    get name(): string
    {
        return this._name;
    }

    get slug(): string
    {
        return this._slug;
    }

    get enable(): boolean
    {
        return this._enable;
    }

    get permissions(): string[]
    {
        return this._permissions;
    }
}

export default RoleCommandSaveRequest;
