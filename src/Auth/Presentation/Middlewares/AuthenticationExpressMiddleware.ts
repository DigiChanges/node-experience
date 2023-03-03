import { REPOSITORIES, SERVICES } from '../../../Config/Injects';
import AuthService from '../../Domain/Services/AuthService';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import { DependencyContainer } from 'tsyringe';

const AuthenticationExpressMiddleware = async(req: any, res: any, next: any) =>
{
    try
    {
        const container: DependencyContainer = req.container;
        const authService: AuthService = container.resolve<AuthService>(SERVICES.AuthService);
        const userRepository: IUserRepository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);

        const existMethodAndUrl = authService.checkWhitelist(req.method, req.path);

        if (existMethodAndUrl)
        {
            next();
        }
        else
        {
            const token = req.get('Authorization');

            req.decodeToken = authService.validateToken(token);

            req.authUser = await userRepository.getOneByEmail(req.decodeToken.email);

            next();
        }
    }
    catch (error)
    {
        next(error);
    }
};

export default AuthenticationExpressMiddleware;
