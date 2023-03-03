import TypeAuth from '../../Domain/Types/TypeAuth';
import Auth from '../../Domain/Types/Auth';

export const AuthUser  = <T extends Auth = Auth >(request: Request | any, type: TypeAuth = 'authUser'): T =>
{
    return request[type];
};
