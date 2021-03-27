import IUserDomain from '../../IDomain/IUserDomain';

interface CheckUserRolePayload
{
    roleToCheck: string;
    user:  IUserDomain;
}

export default CheckUserRolePayload;
