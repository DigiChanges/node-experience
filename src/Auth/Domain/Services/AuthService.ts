import jwt, { TAlgorithm } from 'jwt-simple';
import _ from 'lodash';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import Permissions from '../../../Config/Permissions';
import WrongPermissionsException from '../Exceptions/WrongPermissionsException';
import ITokenDecode from '../../../Shared/InterfaceAdapters/ITokenDecode';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import TokenExpiredHttpException from '../../Presentation/Exceptions/TokenExpiredHttpException';
import TokenNotFoundHttpException from '../../Presentation/Exceptions/TokenNotFoundHttpException';
import Auth from '../Types/Auth';
import MainConfig from '../../../Config/mainConfig';

class AuthService
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private userRepository: IUserRepository;

    private config = MainConfig.getInstance();

    public decodeToken(token: string, bearer = true): ITokenDecode
    {
        const _token = bearer ? token.split(' ')[1] : token;

        const secret: string = this.config.getConfig().jwt.secret;
        const algorithm: TAlgorithm = this.config.getConfig().encryption.bcrypt.algorithm;

        return jwt.decode(_token, secret, false, algorithm);
    }

    public getPermissions(auth_user: IUserDomain): string[]
    {
        const rolePermissions = auth_user.getRoles().filter(role => role.enable).reduce((accum, role) =>
        {
            return [...accum, ...role.permissions];
        }, []);

        return [...new Set([...auth_user.permissions, ...rolePermissions])];
    }

    public validatePermissions(permissions: string[]): void
    {
        if (!_.isEmpty(permissions) && _.isEmpty(_.intersection(permissions, Permissions.permissions())))
        {
            throw new WrongPermissionsException();
        }
    }

    public getByEmail(email: string): Promise<Auth>
    {
        return this.userRepository.getOneByEmail(email);
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

    public validateToken(token: string): ITokenDecode
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

    public validateRefreshToken(refreshToken: string): ITokenDecode
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
        const apiWhitelist: { methods: string[], url: string, urlRegExp?: RegExp}[] = this.config.getConfig().apiWhitelist;

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
}

export default AuthService;
