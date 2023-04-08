import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import jwt from 'jwt-simple';
import MainConfig from '../../../Config/MainConfig';
import TokenNotFoundHttpException from '../../Presentation/Exceptions/TokenNotFoundHttpException';
import IDecodeToken from '../Models/IDecodeToken';

class AuthHelperService
{
    private config = MainConfig.getInstance().getConfig();

    public getToken(authorizationHeader: string): string
    {
        if (!authorizationHeader)
        {
            throw new TokenNotFoundHttpException();
        }

        return authorizationHeader.replaceAll('Bearer ', '');
    }

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

        const { secret } = this.config.jwt;
        const { algorithm } = this.config.encryption.bcrypt;

        return jwt.decode(_token, secret, false, algorithm);
    }

    public validateToken(token: string, bearer = false): IDecodeToken
    {
        if (!token)
        {
            throw new TokenNotFoundHttpException();
        }

        return this.decodeToken(token, bearer);
    }
}

export default AuthHelperService;
