import IAuthService from '../../InterfaceAdapters/IAuthService';
import {SERVICES} from '../../../services';
import ContainerFactory from '../../../Shared/Factories/ContainerFactory';

const AuthenticationMiddleware = async(req: any, res: any, next: any) =>
{
    try
    {
        const authService =  ContainerFactory.create<IAuthService>(SERVICES.IAuthService);

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
