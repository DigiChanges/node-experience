import RoleRepPayload from '../../../Domain/Payloads/Role/RoleRepPayload';
import { IsArray, IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';

class RoleRepRequest implements RoleRepPayload
{
    private readonly _name: string;
    private readonly _slug: string;
    protected _permissions: string[];
    private readonly _enable: boolean;

    constructor(data: Record<string, any>)
    {
        this._name = data.name;
        this._slug = data.slug?.toLowerCase() ?? data.name?.toLowerCase();
        this._permissions = data.permissions ?? [];
        this._enable = data.enable ?? true;
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

    @decorate(IsArray())
    @decorate(IsString({
        each: true
    }))
    get permissions(): string[]
    {
        return this._permissions;
    }

    @decorate(IsOptional())
    @decorate(IsBoolean())
    get enable(): boolean
    {
        return this._enable;
    }
}

export default RoleRepRequest;
