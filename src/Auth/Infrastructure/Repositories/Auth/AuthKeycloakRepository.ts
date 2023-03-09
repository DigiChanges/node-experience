import IAuthRepository from './IAuthRepository';
import qs from 'qs';
import MainConfig from '../../../../Config/MainConfig';
import axios from 'axios';

class AuthKeycloakRepository implements IAuthRepository
{
    constructor()
    {
        // super(User.name, ['roles']);
    }

    public async forgotPassword(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async getPermissions(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async login(payload: any): Promise<any>
    {
        const { username, password } = payload;

        const { clientId, clientSecret, host } = MainConfig.getInstance().getConfig().auth;

        const data = qs.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'password',
            scope: 'openid',
            username,
            password
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${host}/realms/${clientId}/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        return (await axios(config)).data;
    }

    public async logout(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async me(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async refreshToken(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async resetPassword(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async signUp(payload: any): Promise<any>
    {
        return Promise.resolve(undefined);
    }

    public async verifyToken({ token }: { token: string}): Promise<any>
    {
        const { clientId, clientSecret, host } = MainConfig.getInstance().getConfig().auth;

        const data = qs.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            scope: 'openid',
            token
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${host}/realms/${clientId}/protocol/openid-connect/token/introspect`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        return (await axios(config)).data;
    }
}

export default AuthKeycloakRepository;
