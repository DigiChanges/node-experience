import UserActivePayload from './UserActivePayload';

interface UserAssignRoleBySlugPayload extends UserActivePayload
{
    slugRole: string;
}

export default UserAssignRoleBySlugPayload;
