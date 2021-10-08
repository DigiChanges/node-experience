import IUserDomain from '../IUserDomain';

interface CheckUserRolePayload
{
    role_to_check: string;
    user:  IUserDomain;
}

export default CheckUserRolePayload;
