import LoginResponse from '../Infrastructure/Repositories/Auth/Responses/LoginResponse';
import AuthPayload from '../Domain/Payloads/Auth/AuthPayload';
import IUserDomain from '../Domain/Entities/IUserDomain';
import VerifyTokenPayload from '../Infrastructure/Repositories/Auth/Payload/VerifyTokenPayload';
import LogoutPayload from '../../../dist/src/Auth/Domain/Payloads/Auth/LogoutPayload';
import RefreshTokenPayload from '../Domain/Payloads/Auth/RefreshTokenPayload';
import SignUpPayload from '../Infrastructure/Repositories/Auth/Payload/SignUpPayload';
import PermissionPayload from '../Infrastructure/Repositories/Auth/Payload/PermissionPayload';

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

const responseIUserDomain = {
    birthdate: '',
    country: '',
    createdAt: undefined,
    email: '',
    emailVerified: false,
    enable: false,
    firstName: '',
    genre: '',
    lastName: '',
    phone: '',
    updatedAt: undefined
} as IUserDomain;

class AuthMockRepository
{
    async login(payload: AuthPayload): Promise<LoginResponse>
    {
        return new Promise<LoginResponse>((resolve) => resolve(responseLoginResponse));
    }

    async verifyToken(payload: VerifyTokenPayload): Promise<IUserDomain>
    {
        return new Promise<IUserDomain>((resolve) => resolve(responseIUserDomain));
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
        return new Promise<IUserDomain>((resolve) => resolve(responseIUserDomain));
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
