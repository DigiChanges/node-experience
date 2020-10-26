import Config from "config";
import StatusCode from "../Shared/StatusCode";
import AuthService from "../../Application/Services/AuthService";
import ErrorHttpException from '../../Application/Shared/ErrorHttpException';

const AuthenticationMiddleware = (req: any, res: any, next: any) =>
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
        try
        {
            // Not exist the token in the Header
            let token = req.get('Authorization');

            if(typeof token === 'undefined' || token.indexOf('Bearer') === -1)
            {
                throw new ErrorHttpException(StatusCode.HTTP_FORBIDDEN, 'You must be authenticated' );
            }

            let TokenArray = token.split(" ");

            if(typeof TokenArray[1] === 'undefined')
            {
                throw new ErrorHttpException(StatusCode.HTTP_FORBIDDEN, 'Token Not Found' );
            }

            const authService = new AuthService();

            let tokentDecode = authService.decodeToken(token);

            req.tokenDecode = tokentDecode;

            next();
        }
        catch(error)
        {
            throw new ErrorHttpException(StatusCode.HTTP_FORBIDDEN, error.message);

        }
    }
};

export default AuthenticationMiddleware;
