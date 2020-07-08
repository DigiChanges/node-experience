import IdPayload from "../Defaults/IdPayload";

interface UserAssignRolePayload extends IdPayload
{
    rolesId():  Promise<string[]>;
}

export default UserAssignRolePayload