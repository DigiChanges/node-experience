import AuthService from '../../../Domain/Services/AuthService';

const AuthenticationMiddleware = async(req: any, res: any, next: any) =>
{
    try
    {
        const authService =  new AuthService();

        const existMethodAndUrl = authService.checkWhitelist(req.method, req.path);

        if (existMethodAndUrl)
        {
            next();
        }
        else
        {
            const token = req.get('Authorization');

            req.tokenDecode = authService.validateToken(token);

            req.authUser = await authService.getByEmail(req.tokenDecode.email);

            next();
        }
    }
    catch (error)
    {
        next(error);
    }
};

export default AuthenticationMiddleware;
