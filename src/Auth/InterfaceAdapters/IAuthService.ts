import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import ITokenDecode from '../../Shared/InterfaceAdapters/ITokenDecode';
import Auth from '../Domain/Types/Auth';

interface IAuthService
{
    decodeToken (token: string): ITokenDecode;
    getPermissions(authUser: IUserDomain): string[]
    validatePermissions(permissions: string[]): void
    getByEmail(email: string): Promise<Auth>;
    authorize(authUser: Auth, handlerPermission: string): Promise<boolean>;
    validateToken(token: string): ITokenDecode;
    checkWhitelist(method: string, path: string): boolean;
}

export default IAuthService;
