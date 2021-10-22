import TypeAuth from '../../Domain/Types/TypeAuth';
import Auth from '../../Domain/Types/Auth';
import { ParameterizedContext } from 'koa';

export const AuthUser  = <T extends Auth = Auth >(request: Request | ParameterizedContext |any, type: TypeAuth = 'authUser'): T =>
{
    return request[type];
};
