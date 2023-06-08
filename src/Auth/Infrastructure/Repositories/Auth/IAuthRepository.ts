import LoginResponse from './Responses/LoginResponse';
import AuthPayload from '../../../Domain/Payloads/Auth/AuthPayload';
import IUserDomain from '../../../Domain/Entities/IUserDomain';
import SignUpPayload from './Payload/SignUpPayload';
import VerifyTokenPayload from './Payload/VerifyTokenPayload';
import PermissionPayload from './Payload/PermissionPayload';
import RefreshTokenPayload from '../../../Domain/Payloads/Auth/RefreshTokenPayload';
import LogoutPayload from '../../../Domain/Payloads/Auth/LogoutPayload';

interface IAuthRepository
{
    login(payload: AuthPayload): Promise<LoginResponse>;
    verifyToken(payload: VerifyTokenPayload): Promise<IUserDomain>
    verifyAccount(payload: any): Promise<Record<string, unknown>>
    logout(payload: LogoutPayload): Promise<Record<string, unknown>>
    refreshToken(payload: RefreshTokenPayload): Promise<LoginResponse>
    me(payload: { token: string }): Promise<IUserDomain>
    signUp(payload: SignUpPayload): Promise<Record<string, unknown>>
    checkPermissions(payload: PermissionPayload): Promise<Record<string, unknown>>
}

export default IAuthRepository;
