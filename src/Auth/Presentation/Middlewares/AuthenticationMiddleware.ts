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
        const apiWhitelist: {method: string[], url: string}[] = Config.get('apiWhitelist');

        apiWhitelist.forEach((conf) =>
        {
            if (conf.method.includes(req.method) || conf.method.includes('*'))
            {
                if (conf.url.includes('**') || conf.url.includes('*'))
                {
                    const exist: boolean = conf.url.split('**')
                        .every(_extract =>
                        {
                            if (_extract.includes('*'))
                            {
                                _extract = _extract.replace('*', '');
                            }
                            return req.path.includes(_extract);
                        });

                    if (exist)
                    {
                        existMethodAndUrl = true;
                        return;
                    }
                }

                if (conf.url === req.path)
                {
                    existMethodAndUrl = true;
                    return;
                }
            }
        });

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
