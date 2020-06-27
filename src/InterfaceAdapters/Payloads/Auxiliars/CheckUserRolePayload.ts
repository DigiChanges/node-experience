import User from "../../../Infrastructure/Entities/User";

interface CheckUserRolePayload
{
    roleToCheck: string;
    user:  User;
}

export default CheckUserRolePayload