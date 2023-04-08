import BaseAxiosRepository from './BaseAxiosRepository';
import MainConfig from '../../../../Config/MainConfig';
import AuthPayload from '../../../Domain/Payloads/Auth/AuthPayload';
import qs from 'qs';
import axios from 'axios';

class KeycloakAxiosRepository extends BaseAxiosRepository
{
    protected readonly clientId: string;
    protected readonly clientUuid: string;
    protected readonly clientSecret: string;
    protected readonly host: string;
    protected readonly mainRealm: string;
    protected readonly username: string;
    protected readonly password: string;
    protected readonly basicBody: Record<string, string>;

    constructor()
    {
        super();
        const config = MainConfig.getInstance().getConfig();
        const { clientId, clientUuid, clientSecret, host, mainRealm, username, password } = config.auth;

        this.clientId = clientId;
        this.clientUuid = clientUuid;
        this.clientSecret = clientSecret;
        this.mainRealm = mainRealm;
        this.username = username;
        this.password = password;
        this.host = host;

        this.basicBody = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'password',
            scope: 'openid'
        };
    }

    public async login(payload: AuthPayload): Promise<any>
    {
        const { username, password, clientId } = payload;

        const data = qs.stringify({
            ...this.basicBody,
            client_id: clientId ?? this.basicBody.client_id,
            client_secret: clientId === 'admin-cli' ? undefined : this.basicBody.client_secret,
            scope: clientId === 'admin-cli' ? undefined : 'openid uma_authorization',
            username,
            password
        });

        const realm = clientId === 'admin-cli' ? 'master' : this.mainRealm;

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.host}/realms/${realm}/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        return (await axios(config)).data;
    }

    protected async loginAdmin()
    {
        return await this.login({ username: this.username, password: this.password, clientId: 'admin-cli'  });
    }
}

export default KeycloakAxiosRepository;
