import qs from 'qs';
import IAuthRepository from './IAuthRepository';
import PermissionPayload from './Payload/PermissionPayload';

class AuthSupabaseRepository implements IAuthRepository
{
    private readonly mainUrl: string;

    constructor()
    {
        // this.mainUrl = `${this.host}/realms/${this.mainRealm}/protocol/openid-connect`;
    }

    public async checkPermissions({ token, permission }: PermissionPayload): Promise<any>
    {
        // const data = qs.stringify({
        //     grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
        //     audience: this.clientId,
        //     subject_token: token,
        //     permission
        // });
        //
        // const auth_token = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        //
        // const config = {
        //     ...this.config,
        //     method: 'post',
        //     url: `${this.mainUrl}/token`,
        //     headers: {
        //         'Authorization': `Basic ${auth_token}`,
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     data
        // };
        //
        // return (await axios(config)).data;
    }
}

export default AuthSupabaseRepository;
