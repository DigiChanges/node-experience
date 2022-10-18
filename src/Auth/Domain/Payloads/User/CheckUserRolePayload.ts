import IUserDomain from '../../Entities/IUserDomain';

interface CheckUserRolePayload
{
    roleToCheck: string;
    user:  IUserDomain;
}

export default CheckUserRolePayload;
