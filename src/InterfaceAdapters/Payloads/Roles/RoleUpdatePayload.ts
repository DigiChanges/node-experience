import IdPayload from '../Defaults/IdPayload';

interface RoleUpdatePayload extends IdPayload
{
    getName(): string;
    getSlug(): string;
    getPermissions(): string[];
    getEnable(): boolean;
}

export default RoleUpdatePayload;
