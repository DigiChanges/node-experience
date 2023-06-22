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
    'access_token': 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlOEVxVnRHdXZlbUpTRmw3aHVIOC1TUUlTV08xazNtV193OGcwd29sVV9zIn0.eyJleHAiOjE2ODcyOTUzNjksImlhdCI6MTY4NzI5NTMwOSwianRpIjoiYzMwMDFiYjktNDg2OS00ODBjLTgxNzMtMTIxNDEyNGQ2OTY3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiIzMWYyMTJiYy00ODVlLTQ1MTktYTY3Mi03YzY1N2IyOGQ1ZjAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiN2UyOGEzZTUtOWIwYy00MDdkLWFjZWQtZDg2ZTYyOWJmMGE1IiwiYWNyIjoiMSIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjdlMjhhM2U1LTliMGMtNDA3ZC1hY2VkLWQ4NmU2MjliZjBhNSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic3VwZXJhZG1pbkBub2RlLmNvbSJ9.lPYGyB0c8Fynr32Scg69vjuYgxHFLkkJIzRQLf2iUumryP10ceB38k3_tfkDGuI9IALtiSwySdkYlajNBatYJWWshJRIXqSlExCpigdu6kKfpupTqLkDwEbej6Mu1PDEz3D8uQppydFqIY8u4gWOAlp-9w8qHy_dUYcZKhcyEwEge0oov7_FqsueSH5ohPg8X3OtJdvS_DFAYo6OY4plJHQyBqIRzCSECwLGAxc41DO0KB8KPxLz_kcMVKHmXVxPChkz73bhZZa4Rnl51gnohys6jTpXM5fcQ0IFDhepmR0DlW1-pak1QW0fj083s1Gs_Lby2i7MUedMf0SHhTaTnw',
    'expires_in': 60,
    'id_token': '',
    'refresh_expires_in': 1800,
    'refresh_token': 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiOWE3M2FiOC0zMTNiLTQ2ZDItYjlkOC1hYTJlNDViOWRiMjEifQ.eyJleHAiOjE2ODcyOTcxMDksImlhdCI6MTY4NzI5NTMwOSwianRpIjoiYjM3ZWI5YzAtZDcwNi00MjEyLTk0MjItYzVmYmIwYzZmM2U2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL21hc3RlciIsInN1YiI6IjMxZjIxMmJjLTQ4NWUtNDUxOS1hNjcyLTdjNjU3YjI4ZDVmMCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiN2UyOGEzZTUtOWIwYy00MDdkLWFjZWQtZDg2ZTYyOWJmMGE1Iiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiN2UyOGEzZTUtOWIwYy00MDdkLWFjZWQtZDg2ZTYyOWJmMGE1In0.IO6OTZLy_yLHBTegxwlCQetWqOjUuyRGtQN-XfTNmfo',
    'scope': 'profile email',
    'session_state': '7e28a3e5-9b0c-407d-aced-d86e629bf0a5',
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
