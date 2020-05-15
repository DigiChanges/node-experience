import User from "../../Entities/User";

interface CheckUserRolePayload
{
    roleToCheck: string;
    user:  User;
}

export default CheckUserRolePayload