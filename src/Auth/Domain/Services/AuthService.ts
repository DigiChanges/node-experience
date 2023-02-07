import jwt from 'jwt-simple';
import IUserDomain from '../Entities/IUserDomain';
import IDecodeToken from '../Models/IDecodeToken';
import TokenExpiredHttpException from '../../Presentation/Exceptions/TokenExpiredHttpException';
import TokenNotFoundHttpException from '../../Presentation/Exceptions/TokenNotFoundHttpException';
import Auth from '../Types/Auth';
import MainConfig from '../../../Config/MainConfig';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

class AuthService
{
    private config = MainConfig.getInstance().getConfig();

    public decodeToken(token: string, bearer = true): IDecodeToken
    {
        const _token = bearer ? token.split(' ')[1] : token;

        const { secret } = this.config.jwt;
        const { algorithm } = this.config.encryption.bcrypt;

        return jwt.decode(_token, secret, false, algorithm);
    }

    public getPermissions(authUser: IUserDomain): string[]
    {
        const rolePermissions: string[] = authUser.getRoles().filter(role => role.enable).reduce((accum, role) =>
        {
            return [...accum, ...role.permissions];
        }, []);

        return [...new Set([...authUser.permissions, ...rolePermissions])];
    }

    public async authorize(authUser: Auth, handlerPermissions: string[]): Promise<boolean>
    {
        const totalPermissions = this.getPermissions(authUser as IUserDomain);

        if ((authUser as IUserDomain)?.isSuperAdmin)
        {
            return true;
        }

        return handlerPermissions.every((hp: string) => totalPermissions.some((permission) => hp === permission));
    }

    public validateToken(token: string): IDecodeToken
    {
        if (!token || !token.includes('Bearer'))
        {
            throw new TokenExpiredHttpException();
        }

        const tokenArray = token.split(' ');
        const hash = tokenArray[1];

        if (!hash || !token)
        {
            throw new TokenNotFoundHttpException();
        }

        return this.decodeToken(token);
    }

    public validateRefreshToken(refreshToken: string): IDecodeToken
    {
        if (!refreshToken)
        {
            throw new TokenNotFoundHttpException();
        }

        return this.decodeToken(refreshToken, false);
    }

    public checkWhitelist(reqMethod: string, reqPath: string): boolean
    {
        const samePath = (_url: string, _path: string): boolean => (_url === _path);

        const matchUrlRegExp = (_url_reg_exp: RegExp, _path: string): boolean =>
        {
            if (_url_reg_exp)
            {
                const regex = new RegExp(_url_reg_exp);

                return regex.test(_path);
            }

            return false;
        };

        const matchUrlPathWithParams = (_url: string, _path: string): boolean =>
        {
            if (_url.includes('**') || _url.includes('*'))
            {
                const isAllowed = (path: string[], url: string[]): boolean =>
                {
                    return url.every((_urlExtract, order): boolean =>
                    {
                        return (
                            (
                                (_urlExtract === path[order])
                                || (order + 1 === url.length && _urlExtract === '*')
                                || (order + 1 < url.length && _urlExtract === '**')
                                || (order + 1 === url.length && path.length === url.length && _urlExtract === '**')
                            )
                        );
                    });
                };

                return isAllowed(_path.split('/'), _url.split('/'));
            }

            return false;
        };

        let existMethodAndUrl = false;
        const { apiWhitelist } = this.config;

        for (const conf of apiWhitelist)
        {
            if (conf.methods.includes(reqMethod) || conf.methods.includes('*'))
            {
                existMethodAndUrl = existMethodAndUrl || samePath(conf.url, reqPath);

                existMethodAndUrl = existMethodAndUrl || matchUrlRegExp(conf?.urlRegExp, reqPath);

                existMethodAndUrl = existMethodAndUrl || matchUrlPathWithParams(conf.url, reqPath);

                if (existMethodAndUrl)
                {
                    break;
                }
            }
        }

        return existMethodAndUrl;
    }

    getConfirmationToken(email: string): string
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
}

export default AuthService;
