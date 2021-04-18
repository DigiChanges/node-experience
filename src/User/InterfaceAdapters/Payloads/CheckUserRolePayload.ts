import IUserDomain from '../IUserDomain';

interface CheckUserRolePayload
{
    roleToCheck: string;
    user:  IUserDomain;
}

export default CheckUserRolePayload;
