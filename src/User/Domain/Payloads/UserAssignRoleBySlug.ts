import UserActivePayload from './UserActivePayload';

interface UserAssignRoleBySlug extends UserActivePayload
{
    slugRole: string;
}

export default UserAssignRoleBySlug;
