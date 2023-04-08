import TypeAuth from '../../Domain/Types/TypeAuth';
import Auth from '../../Domain/Types/Auth';
import dayjs from 'dayjs';

export const AuthUser  = <T extends Auth = Auth >(request: Request | any, type: TypeAuth = 'authUser'): T =>
{
    const user = request[type];
    user.birthdate = dayjs(user.birthdate, 'yyyy-mm-dd').toDate();

    return user;
};
