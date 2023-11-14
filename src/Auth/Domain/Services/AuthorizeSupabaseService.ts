import ForbiddenHttpException from '../../Presentation/Exceptions/ForbiddenHttpException';
import IAuthorizeService from './IAuthorizeService';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import MainConfig from '../../../Config/MainConfig';
import IDecodeToken from '../Models/IDecodeToken';
import jwt from 'jwt-simple';

class AuthorizeSupabaseService implements IAuthorizeService
{
    #config = MainConfig.getInstance().getConfig();

    public getConfirmationToken(email: string): string
    {
        dayjs.extend(utc);
        const { iss, secret, aud } = MainConfig.getInstance().getConfig().jwt;
        const expires = dayjs.utc().add(5, 'minute').unix();

        const payload = {
            iss,
            aud,
            sub: email,
            iat: expires,
            exp: expires,
            email
        };

        return jwt.encode(payload, secret, 'HS512');
    }

    public decodeToken(token: string, bearer = true): IDecodeToken
    {
        const _token = bearer ? token.split(' ')[1] : token;

        const { secret } = this.#config.jwt;
        const { algorithm } = this.#config.encryption.bcrypt;

        return jwt.decode(_token, secret, false, algorithm);
    }

    public validateToken(token: string, bearer = false): void
    {
        // if (!token)
        // {
        //     throw new TokenNotFoundHttpException();
        // }
        //
        // return this.decodeToken(token, bearer);
    }

    authorize(token: string): Promise<void>
    {
        return Promise.resolve(undefined);
    }

    // public async authorize(token: string): Promise<void>
    // {
    //     const permission = handlerPermissions[0]; // ! TODO: Warning, to be refactor ?
    //     const verified = await this.repository.checkPermissions({ token, permission });
    //
    //     if (verified.error === 'access_denied' || verified.error === 'unauthorized_client')
    //     {
    //         throw new ForbiddenHttpException();
    //     }
    // }
}

export default AuthorizeSupabaseService;
