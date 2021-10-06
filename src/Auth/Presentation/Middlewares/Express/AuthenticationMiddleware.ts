import IAuthService from '../../../InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../../services';
import ContainerFactory from '../../../../Shared/Factories/ContainerFactory';


const AuthenticationMiddleware = async(req: any, res: any, next: any) =>
{
    try
    {
        const auth_service =  ContainerFactory.create<IAuthService>(SERVICES.IAuthService);

        const exist_method_and_url = auth_service.check_whitelist(req.method, req.path);

        if (exist_method_and_url)
        {
            next();
        }
        else
        {
            const token = req.get('Authorization');

            req.tokenDecode = auth_service.validate_token(token);

            req.authUser = await auth_service.get_by_email(req.tokenDecode.email);

            next();
        }
    }
    catch (error)
    {
        next(error);
    }
};

export default AuthenticationMiddleware;
