import UserRepPayload from '../../../Domain/Payloads/User/UserRepPayload';
import { ArrayMinSize, IsArray, IsBoolean, IsString } from 'class-validator';
import { decorate, Mixin } from 'ts-mixer';
import UserWithoutPermissionsRequest from './UserWithoutPermissionsRequest';

class UserRepRequest extends Mixin(UserWithoutPermissionsRequest) implements UserRepPayload
{
    private readonly _enable: boolean;
    private readonly _permissions: string[];

    constructor(data: Record<string, any>)
    {
        super(data);
        this._permissions = data.permissions;
        this._enable = data?.enable ?? true;
    }

    @decorate(IsArray())
    @decorate(ArrayMinSize(0))
    @decorate(IsString({
        each: true
    }))
    get permissions(): string[]
    {
        return this._permissions;
    }

    @decorate(IsBoolean())
    get enable(): boolean
    {
        return this._enable;
    }
}

export default UserRepRequest;
