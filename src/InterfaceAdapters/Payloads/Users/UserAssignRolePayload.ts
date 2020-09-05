import IdPayload from "../Defaults/IdPayload";

interface UserAssignRolePayload extends IdPayload
{
    getRolesId(): string[];
}

export default UserAssignRolePayload;
