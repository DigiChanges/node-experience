import LoginResponse from '../Infrastructure/Repositories/Auth/Responses/LoginResponse';
import AuthPayload from '../Domain/Payloads/Auth/AuthPayload';
import IUserDomain from '../Domain/Entities/IUserDomain';
import VerifyTokenPayload from '../Infrastructure/Repositories/Auth/Payload/VerifyTokenPayload';
import RefreshTokenPayload from '../Domain/Payloads/Auth/RefreshTokenPayload';
import SignUpPayload from '../Infrastructure/Repositories/Auth/Payload/SignUpPayload';
import PermissionPayload from '../Infrastructure/Repositories/Auth/Payload/PermissionPayload';
import LogoutPayload from '../Domain/Payloads/Auth/LogoutPayload';
import User from '../Domain/Entities/User';
import { payloadUser } from './DataMock';

const responseLoginResponse: LoginResponse = {
    'not-before-policy': 0,
    'access_token': '',
    'expires_in': 0,
    'id_token': '',
    'refresh_expires_in': 0,
    'refresh_token': '',
    'scope': '',
    'session_state': '',
    'token_type': undefined
};

class AuthMockRepository
{
    async login(payload: AuthPayload): Promise<LoginResponse>
    {
        return new Promise<LoginResponse>((resolve) => resolve(responseLoginResponse));
    }

    async verifyToken(payload: VerifyTokenPayload): Promise<IUserDomain>
    {
        const user = new User(payloadUser);
        return new Promise<IUserDomain>((resolve) => resolve(user));
    }

    async verifyAccount(payload): Promise<Record<string, unknown>>
    {
        return new Promise<Record<string, unknown>>((resolve) => resolve({}));
    }

    async logout(payload: LogoutPayload): Promise<Record<string, unknown>>
    {
        return new Promise<Record<string, unknown>>((resolve) => resolve({}));
    }

    async refreshToken(payload: RefreshTokenPayload): Promise<LoginResponse>
    {
        return new Promise<LoginResponse>((resolve) => resolve(responseLoginResponse));
    }

    async me(payload: { token: string }): Promise<IUserDomain>
    {
        const user = new User(payloadUser);
        return new Promise<IUserDomain>((resolve) => resolve(user));
    }

    async signUp(payload: SignUpPayload): Promise<Record<string, unknown>>
    {
        return new Promise<Record<string, unknown>>((resolve) => resolve({}));
    }

    async checkPermissions(payload: PermissionPayload): Promise<Record<string, unknown>>
    {
        return new Promise<Record<string, unknown>>((resolve) => resolve({}));
    }
}

export default AuthMockRepository;
