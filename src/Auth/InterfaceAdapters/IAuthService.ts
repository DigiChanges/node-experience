import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import ITokenDecode from '../../Shared/InterfaceAdapters/ITokenDecode';
import Auth from '../Domain/Types/Auth';

interface IAuthService
{
    decode_token(token: string): ITokenDecode;
    get_permissions(authUser: IUserDomain): string[]
    validate_permissions(permissions: string[]): void
    get_by_email(email: string): Promise<Auth>;
    authorize(authUser: Auth, handlerPermission: string): Promise<boolean>;
    validate_token(token: string): ITokenDecode;
    check_whitelist(method: string, path: string): boolean;
}

export default IAuthService;
