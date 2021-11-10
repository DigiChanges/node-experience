import UserRepPayload from '../../../InterfaceAdapters/Payloads/UserRepPayload';
import { ArrayMinSize, IsArray, IsBoolean, IsString } from 'class-validator';
import { decorate, Mixin } from 'ts-mixer';
import UserWithoutPermissionsRequest from './UserWithoutPermissionsRequest';

class UserRepRequest extends Mixin(UserWithoutPermissionsRequest) implements UserRepPayload
{
    @decorate(IsBoolean())
    enable: boolean;

    @decorate(IsArray())
    @decorate(ArrayMinSize(0))
    @decorate(IsString({
        each: true
    }))
    permissions: string[];

    constructor(data: Record<string, any>)
    {
        super(data);
        this.permissions = data.permissions;
        this.enable = data.enable ?? true;
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getEnable(): boolean
    {
        return this.enable;
    }
}

export default UserRepRequest;
