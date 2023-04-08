import LoginResponse from './Responses/LoginResponse';
import VerifyTokenResponse from './Responses/VerifyTokenResponse';
import AuthPayload from '../../../Domain/Payloads/Auth/AuthPayload';
import IUserDomain from '../../../Domain/Entities/IUserDomain';

interface IAuthRepository
{
    login(payload: AuthPayload): Promise<LoginResponse>;
    verifyToken(payload: any): Promise<IUserDomain>
    verifyAccount(payload: any): Promise<any>
    logout(payload: any): Promise<any>
    refreshToken(payload: any): Promise<any>
    me(payload: any): Promise<any>
    signUp(payload: any): Promise<any>
    getPermissions(payload: any): Promise<any>
    checkPermissions(payload: any): Promise<any>
}

export default IAuthRepository;
