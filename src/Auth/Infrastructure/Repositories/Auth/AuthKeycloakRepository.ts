import axios from 'axios';
import qs from 'qs';
import IAuthRepository from './IAuthRepository';
import IUserDomain from '../../../Domain/Entities/IUserDomain';
import VerifyTokenResponse from './Responses/VerifyTokenResponse';
import User from '../../../Domain/Entities/User';
import KeycloakAxiosRepository from './KeycloakAxiosRepository';

class AuthKeycloakRepository extends KeycloakAxiosRepository implements IAuthRepository
{
    private readonly mainUrl: string;

    constructor()
    {
        super();
        this.mainUrl = `${this.host}/realms/${this.mainRealm}/protocol/openid-connect`;
    }

    public async getPermissions(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async logout(payload: any): Promise<any>
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

    public async me({ token }: any): Promise<any>
    {
        return await this.verifyToken({ token });
    }

    public async refreshToken(payload: any): Promise<any>
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

    public async signUp(payload: any): Promise<any>
    {
        const loginRes = await this.login({ username: this.username, password: this.password, clientId: 'admin-cli'  });

        const data = {
            username: payload.email,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            enabled: true,
            attributes: {
                genre: [payload.genre],
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

    public async verifyAccount(payload: any): Promise<any>
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

    public async verifyToken(payload: any): Promise<IUserDomain>
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
            birthdate: '1970-01-01',
            genre: 'O',
            phone: '5555554422',
            country: 'AR',
            verify: false,
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
                birthdate: response.birthdate,
                genre: response.genre,
                phone: response.phone,
                country: response.country,
                verify: response.email_verified,
                enable: true,
                roles: []
            };
        }

        return new User(_payload);
    }

    public async checkPermissions({ token, permission }: { token: string, permission: string }): Promise<any>
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
