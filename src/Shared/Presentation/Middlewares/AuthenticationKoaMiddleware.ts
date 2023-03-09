import Koa from 'koa';
import { DependencyContainer } from 'tsyringe';
import IAuthRepository from '../../../Auth/Infrastructure/Repositories/Auth/IAuthRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import MainConfig from '../../../Config/MainConfig';

const AuthenticationKoaMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    try
    {
        const { authorization } = MainConfig.getInstance().getConfig().auth;
        const container: DependencyContainer = ctx.container;
        let token = ctx.get('Authorization');
        token = token.replaceAll('Bearer ', '');

        const authRepository: IAuthRepository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);

        if (!token && !authorization)
        {
            throw Error('Error token not found');
        }

        if(authorization)
        {
            const responseVerify: any = await authRepository.verifyToken({ token });
        }
    }
    catch (e)
    {
        console.log(e);
    }

    await next();
};

export default AuthenticationKoaMiddleware;
