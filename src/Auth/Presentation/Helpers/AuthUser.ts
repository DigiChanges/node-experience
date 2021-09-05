import TypeAuth from '../../Domain/Types/TypeAuth';
import Auth from '../../Domain/Types/Auth';

export const AuthUser = (request: Request | any, type: TypeAuth = 'authUser'): Auth =>
{
    return request[type] as Auth;
};
