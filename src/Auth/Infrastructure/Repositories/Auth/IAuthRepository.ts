import LoginResponse from './Responses/LoginResponse';
import VerifyTokenResponse from './Responses/VerifyTokenResponse';

interface IAuthRepository
{
    login(payload: any): Promise<LoginResponse>;
    verifyToken(payload: { token: string }): Promise<VerifyTokenResponse>
    logout(payload: any): Promise<any>
    refreshToken(payload: any): Promise<any>
    me(payload: any): Promise<any>
    forgotPassword(payload: any): Promise<any>
    resetPassword(payload: any): Promise<any>
    signUp(payload: any): Promise<any>
    getPermissions(payload: any): Promise<any>
}

export default IAuthRepository;
