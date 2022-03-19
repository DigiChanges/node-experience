import { IsArray, IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';
import RoleRepPayload from '../../Domain/Payloads/RoleRepPayload';

class RoleCommandSaveRequest implements RoleRepPayload
{
    private readonly _name: string;
    private readonly _slug: string;
    private readonly _enable: boolean;
    private readonly _permissions: string[];

    constructor(env: any, role: any = null)
    {
        this._name = env.role;
        this._slug = env.slug?.toLowerCase() ?? env.role?.toLowerCase();
        this._enable = env.enable ?? true;
        this._permissions = [];
    }

    @decorate(Length(3, 30))
    @decorate(IsString())
    get name(): string
    {
        return this._name;
    }

    @decorate(Length(3, 30))
    @decorate(IsString())
    get slug(): string
    {
        return this._slug;
    }

    @decorate(IsOptional())
    @decorate(IsBoolean())
    get enable(): boolean
    {
        return this._enable;
    }

    @decorate(IsArray())
    @decorate(IsString({
        each: true
    }))
    get permissions(): string[]
    {
        return this._permissions;
    }
}

export default RoleCommandSaveRequest;
