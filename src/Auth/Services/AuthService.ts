import {injectable} from 'inversify';
import jwt, {TAlgorithm} from 'jwt-simple';
import _ from 'lodash';
import Config from 'config';

import EncryptionFactory from '../../Shared/Factories/EncryptionFactory';
import IAuthService from '../InterfaceAdapters/IAuthService';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import Permissions from '../../Config/Permissions';
import WrongPermissionsException from '../Domain/Exceptions/WrongPermissionsException';
import {IEncryption} from '@digichanges/shared-experience';
import ITokenDecode from '../../Shared/InterfaceAdapters/ITokenDecode';
import {containerFactory} from '../../Shared/Decorators/ContainerFactory';
import {REPOSITORIES} from '../../repositories';
import IUserRepository from '../../User/InterfaceAdapters/IUserRepository';
import TokenExpiredHttpException from '../Presentation/Exceptions/TokenExpiredHttpException';
import TokenNotFoundHttpException from '../Presentation/Exceptions/TokenNotFoundHttpException';
import Auth from '../Domain/Types/Auth';

@injectable()
class AuthService implements IAuthService
{

    @containerFactory(REPOSITORIES.IUserRepository)
    private userRepository: IUserRepository

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    public decodeToken(token: string): ITokenDecode
    {
        const tokenArray = token.split(' ');

        const secret: string = Config.get('jwt.secret');
        const algorithm: TAlgorithm = Config.get('encryption.bcrypt.algorithm');

        return jwt.decode(tokenArray[1], secret, false, algorithm);
    }

    public getPermissions(authUser: IUserDomain): string[]
    {
        const rolePermissions = authUser.getRoles().filter(role => role.enable).reduce((accum, role) =>
        {
            return [...accum, ...role.permissions];
        }, []);

        return [...new Set([...authUser.permissions, ...rolePermissions])];
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

    public async authorize(authUser: Auth, handlerPermission: string): Promise<boolean>
    {
        const totalPermissions = this.getPermissions(authUser as IUserDomain);

        let authorize = false;

        if (authUser?.isSuperAdmin)
        {
            return true;
        }

        totalPermissions.forEach((permission: string) =>
        {
            if (permission === handlerPermission)
            {
                authorize = true;

                return;
            }
        });

        return authorize;
    }

    public validateToken(token: string): ITokenDecode
    {
        if (typeof token === 'undefined' || token.indexOf('Bearer') === -1)
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

    public checkWhitelist(reqMethod: string, reqPath: string): boolean
    {
        const samePath = (_url: string, _path: string): boolean => (_url === _path);

        const matchUrlRegExp = (_urlRegExp: RegExp, _path: string): boolean =>
        {
            if (_urlRegExp)
            {
                const regex = new RegExp(_urlRegExp);

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
        const apiWhitelist: { method: string[], url: string, urlRegExp: RegExp}[] = Config.get('apiWhitelist');

        for (const conf of apiWhitelist)
        {
            if (conf.method.includes(reqMethod) || conf.method.includes('*'))
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
