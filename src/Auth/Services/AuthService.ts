import { injectable } from 'inversify';
import jwt, { TAlgorithm } from 'jwt-simple';
import _ from 'lodash';
import Config from 'config';

import EncryptionFactory from '../../Shared/Factories/EncryptionFactory';
import IAuthService from '../InterfaceAdapters/IAuthService';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import Permissions from '../../Config/Permissions';
import WrongPermissionsException from '../Domain/Exceptions/WrongPermissionsException';
import { IEncryption } from '@digichanges/shared-experience';
import ITokenDecode from '../../Shared/InterfaceAdapters/ITokenDecode';
import { containerFactory } from '../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../Config/repositories';
import IUserRepository from '../../User/InterfaceAdapters/IUserRepository';
import TokenExpiredHttpException from '../Presentation/Exceptions/TokenExpiredHttpException';
import TokenNotFoundHttpException from '../Presentation/Exceptions/TokenNotFoundHttpException';
import Auth from '../Domain/Types/Auth';

@injectable()
class AuthService implements IAuthService
{

    @containerFactory(REPOSITORIES.IUserRepository)
    private user_repository: IUserRepository

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    public decode_token(token: string): ITokenDecode
    {
        const token_array = token.split(' ');

        const secret: string = Config.get('jwt.secret');
        const algorithm: TAlgorithm = Config.get('encryption.bcrypt.algorithm');

        return jwt.decode(token_array[1], secret, false, algorithm);
    }

    public get_permissions(auth_user: IUserDomain): string[]
    {
        const role_permissions = auth_user.get_roles().filter(role => role.enable).reduce((accum, role) =>
        {
            return [...accum, ...role.permissions];
        }, []);

        return [...new Set([...auth_user.permissions, ...role_permissions])];
    }

    public validate_permissions(permissions: string[]): void
    {
        if (!_.isEmpty(permissions) && _.isEmpty(_.intersection(permissions, Permissions.permissions())))
        {
            throw new WrongPermissionsException();
        }
    }

    public get_by_email(email: string): Promise<Auth>
    {
        return this.user_repository.get_one_by_email(email);
    }

    public async authorize(auth_user: Auth, handler_permission: string): Promise<boolean>
    {
        const total_permissions = this.get_permissions(auth_user as IUserDomain);

        let authorize = false;

        if ((auth_user as IUserDomain)?.is_super_admin)
        {
            return true;
        }

        total_permissions.forEach((permission: string) =>
        {
            if (permission === handler_permission)
            {
                authorize = true;

                return;
            }
        });

        return authorize;
    }

    public validate_token(token: string): ITokenDecode
    {
        if (typeof token === 'undefined' || token.indexOf('Bearer') === -1)
        {
            throw new TokenExpiredHttpException();
        }

        const token_array = token.split(' ');
        const hash = token_array[1];

        if (!hash || !token)
        {
            throw new TokenNotFoundHttpException();
        }

        return this.decode_token(token);
    }

    public check_whitelist(reqMethod: string, reqPath: string): boolean
    {
        const same_path = (_url: string, _path: string): boolean => (_url === _path);

        const match_url_reg_exp = (_url_reg_exp: RegExp, _path: string): boolean =>
        {
            if (_url_reg_exp)
            {
                const regex = new RegExp(_url_reg_exp);

                return regex.test(_path);
            }

            return false;
        };

        const match_url_path_with_params = (_url: string, _path: string): boolean =>
        {
            if (_url.includes('**') || _url.includes('*'))
            {
                const is_allowed = (path: string[], url: string[]): boolean =>
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

                return is_allowed(_path.split('/'), _url.split('/'));
            }

            return false;
        };

        let exist_method_and_url = false;
        const api_whitelist: { method: string[], url: string, urlRegExp: RegExp}[] = Config.get('apiWhitelist');

        for (const conf of api_whitelist)
        {
            if (conf.method.includes(reqMethod) || conf.method.includes('*'))
            {
                exist_method_and_url = exist_method_and_url || same_path(conf.url, reqPath);

                exist_method_and_url = exist_method_and_url || match_url_reg_exp(conf?.urlRegExp, reqPath);

                exist_method_and_url = exist_method_and_url || match_url_path_with_params(conf.url, reqPath);

                if (exist_method_and_url)
                {
                    break;
                }
            }
        }

        return exist_method_and_url;
    }
}

export default AuthService;
