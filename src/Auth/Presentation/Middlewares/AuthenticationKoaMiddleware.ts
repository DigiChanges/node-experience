import Koa from 'koa';
import { REPOSITORIES, SERVICES } from '../../../Config/Injects';
import AuthService from '../../Domain/Services/AuthService';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import { DependencyContainer } from 'tsyringe';

const AuthenticationKoaMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    const container: DependencyContainer = ctx.container;
    const authService: AuthService = container.resolve<AuthService>(SERVICES.AuthService);
    const userRepository: IUserRepository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);

    const existMethodAndUrl = authService.checkWhitelist(ctx.method, ctx.path);

    if (!existMethodAndUrl)
    {
        const token = ctx.get('Authorization');

        ctx.decodeToken = authService.validateToken(token);

        ctx.authUser = await userRepository.getOneByEmail(ctx.decodeToken.email);
    }

    await next();
};

export default AuthenticationKoaMiddleware;
