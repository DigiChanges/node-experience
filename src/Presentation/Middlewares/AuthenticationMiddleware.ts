import Config from "config";
import StatusCode from "../Shared/StatusCode";
import AuthService from "../../Application/Services/AuthService";
import ErrorHttpException from '../../Application/Shared/ErrorHttpException';
import TokenExpiredHttpException from "../Exceptions/TokenExpiredHttpException";
import TokenNotFoundHttpException from "../Exceptions/TokenNotFoundHttpException";

const AuthenticationMiddleware = (req: any, res: any, next: any) =>
{
    try
    {
        let existMethodAndUrl = false;
        const apiWhitelist: any[] = Config.get('apiWhitelist');

        apiWhitelist.forEach((conf) =>
        {
            if(conf.method.includes(req.method) && conf.url === req.path)
            {
                existMethodAndUrl = true;
                return;
            }
        });

        if(existMethodAndUrl)
        {
            next();
        }
        else
        {
            // Not exist the token in the Header
            let token = req.get('Authorization');

            if(typeof token === 'undefined' || token.indexOf('Bearer') === -1)
            {
                throw new TokenExpiredHttpException();
            }

            let TokenArray = token.split(" ");

            if(typeof TokenArray[1] === 'undefined')
            {
                throw new TokenNotFoundHttpException();
            }

            const authService = new AuthService();

            let tokentDecode = authService.decodeToken(token);

            req.tokenDecode = tokentDecode;

            next();
        }
    }
    catch(error)
    {
        next(error);
    }
};

export default AuthenticationMiddleware;
