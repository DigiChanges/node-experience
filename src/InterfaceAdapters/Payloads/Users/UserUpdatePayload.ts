import IdPayload from '../Defaults/IdPayload';

interface UserUpdatePayload extends IdPayload
{
    getFirstName(): string;
    getLastName(): string;
    getEmail(): string;
    getEnable(): boolean;
    getTokenUserId(): string;
    getPermissions(): string[];
}

export default UserUpdatePayload;
