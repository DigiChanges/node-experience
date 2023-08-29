import axios from 'axios';
import qs from 'qs';
import IAuthRepository from './IAuthRepository';
import IUserDomain from '../../../Domain/Entities/IUserDomain';
import VerifyTokenResponse from './Responses/VerifyTokenResponse';
import User from '../../../Domain/Entities/User';
import KeycloakAxiosRepository from './KeycloakAxiosRepository';
import PermissionPayload from './Payload/PermissionPayload';
import VerifyTokenPayload from './Payload/VerifyTokenPayload';
import LoginResponse from './Responses/LoginResponse';
import SignUpPayload from './Payload/SignUpPayload';
import RefreshTokenPayload from '../../../Domain/Payloads/Auth/RefreshTokenPayload';
import LogoutPayload from '../../../Domain/Payloads/Auth/LogoutPayload';
import dayjs from 'dayjs';

class AuthKeycloakRepository extends KeycloakAxiosRepository implements IAuthRepository
{
    private readonly mainUrl: string;

    constructor()
    {
        super();
        this.mainUrl = `${this.host}/realms/${this.mainRealm}/protocol/openid-connect`;
    }

    public async logout(payload: LogoutPayload): Promise<Record<string, unknown>>
    {
        const { token: refresh_token  } = payload;

        const data = qs.stringify({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            scope: 'openid',
            refresh_token
        });

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/logout`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        return (await axios(config)).data;
    }

    public async me({ token }: { token: string }): Promise<IUserDomain>
    {
        return await this.verifyToken({ token });
    }

    public async refreshToken(payload: RefreshTokenPayload): Promise<LoginResponse>
    {
        const { refreshToken: refresh_token  } = payload;

        const data = qs.stringify({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'refresh_token',
            scope: 'openid',
            refresh_token
        });

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        return (await axios(config)).data;
    }

    public async signUp(payload: SignUpPayload): Promise<Record<string, unknown>>
    {
        const loginRes = await this.login({ username: this.username, password: this.password, clientId: 'admin-cli'  });

        const data = {
            username: payload.email,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            enabled: true,
            attributes: {
                gender: [payload.gender],
                country: [payload.country],
                birthdate: [payload.birthdate],
                phone: [payload.phone]
            },
            credentials: [
                {
                    type: 'password',
                    value: payload.password,
                    temporary: false
                }
            ]
        };

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.host}/admin/realms/${this.mainRealm}/users`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data
        };

        return (await axios(config)).data;
    }

    public async verifyAccount(payload: Record<string, unknown>): Promise<Record<string, unknown>>
    {
        const loginRes = await this.login({ username: this.username, password: this.password, clientId: 'admin-cli'  });

        const data = {
            enabled: true,
            emailVerified: true
        };

        const config = {
            ...this.config,
            method: 'put',
            url: `${this.host}/admin/realms/${this.mainRealm}/users/${payload.id}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data
        };

        return (await axios(config)).data;
    }

    public async verifyToken(payload: VerifyTokenPayload): Promise<IUserDomain>
    {
        const data = qs.stringify({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            token: payload.token
        });

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/token/introspect`,
            headers: {
                'Authorization': `Bearer ${payload.token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        let _payload = {
            _id: null,
            firstName: 'The',
            lastName: 'Guest',
            email: 'email@email.com',
            birthdate: dayjs('1970-01-01', 'yyyy-mm-dd').toDate(),
            gender: 'O',
            phone: '5555554422',
            country: 'AR',
            emailVerified: false,
            enable: false,
            roles: []
        };

        if (payload.hasActiveAuthorization)
        {
            const response: VerifyTokenResponse = (await axios(config)).data;
            const [firstName, lastName] = response.name.trim().split(' ');

            _payload = {
                _id: response.sub,
                firstName,
                lastName,
                email: response.email,
                birthdate: dayjs(response.birthdate, 'yyyy-mm-dd').toDate(),
                gender: response.gender,
                phone: response.phone,
                country: response.country,
                emailVerified: response.email_verified,
                enable: true,
                roles: []
            };
        }

        return new User(_payload);
    }

    public async checkPermissions({ token, permission }: PermissionPayload): Promise<Record<string, unknown>>
    {
        const data = qs.stringify({
            grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
            audience: this.clientId,
            subject_token: token,
            permission
        });

        const auth_token = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/token`,
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        return (await axios(config)).data;
    }
}

export default AuthKeycloakRepository;
