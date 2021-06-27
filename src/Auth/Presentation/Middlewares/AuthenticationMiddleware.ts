import Config from 'config';
import AuthService from '../../Services/AuthService';
import TokenExpiredHttpException from '../Exceptions/TokenExpiredHttpException';
import TokenNotFoundHttpException from '../Exceptions/TokenNotFoundHttpException';
import _ from 'lodash';

const AuthenticationMiddleware = (req: any, res: any, next: any) =>
{
    try
    {
        let existMethodAndUrl = false;
        const apiWhitelist: { method: string[], url: string, urlRegExp: RegExp}[] = Config.get('apiWhitelist');

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

        for (const conf of apiWhitelist)
        {
            if (conf.method.includes(req.method) || conf.method.includes('*'))
            {
                existMethodAndUrl = existMethodAndUrl || samePath(conf.url, req.path);

                existMethodAndUrl = existMethodAndUrl || matchUrlRegExp(conf?.urlRegExp, req.path);

                existMethodAndUrl = existMethodAndUrl || matchUrlPathWithParams(conf.url, req.path);

                if (existMethodAndUrl)
                {
                    break;
                }
            }
        }

        if (existMethodAndUrl)
        {
            next();
        }
        else
        {
            // Not exist the createToken in the Header
            const token = req.get('Authorization');

            if (typeof token === 'undefined' || token.indexOf('Bearer') === -1)
            {
                throw new TokenExpiredHttpException();
            }

            const TokenArray = token.split(' ');
            const hash = _.get(TokenArray, 1);

            if (!hash || !token)
            {
                throw new TokenNotFoundHttpException();
            }

            const authService = new AuthService();

            req.tokenDecode = authService.decodeToken(token);

            next();
        }
    }
    catch (error)
    {
        next(error);
    }
};

export default AuthenticationMiddleware;
