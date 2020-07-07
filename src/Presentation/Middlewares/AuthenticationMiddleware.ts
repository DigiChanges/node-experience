import Config from "config";
import StatusCode from "../Shared/StatusCode";
import AuthService from "../../Application/Services/AuthService";
import ErrorException from '../../Lib/ErrorException';

const AuthenticationMiddleware = (req: any, res: any, next: any) =>
{
    let existMethodAndUrl = false;
    const apiWhitelist: any[] = Config.get('apiWhitelist');

    apiWhitelist.forEach((conf) => {
        if(conf.method.includes(req.method) && conf.url === req.path) {
            existMethodAndUrl = true;
            return;
        }
    });
    if(existMethodAndUrl) {
        next();
    } else {

        // Not exist the token in the Header
        let token = req.get('Authorization');
        if(typeof token === 'undefined' || token.indexOf('Bearer') === -1){
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'You must be authenticated' );
        }

        let TokenArray = token.split(" ");
        if(typeof TokenArray[1] === 'undefined'){
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Token Not Found' );
        }

        try{
            const authService = new AuthService();

            let tokentDecode = authService.decodeToken(token);
            next();

        } catch(error){

            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, error.message);

        }
    }
};

export default AuthenticationMiddleware;