import VerifyTokenBlacklistUseCase from '../../../Domain/UseCases/VerifyTokenBlacklistUseCase';
import Koa from 'koa';


const VerifyTokenMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    const id = ctx?.tokenDecode?.id;

    if (id)
    {
        const useCase = new VerifyTokenBlacklistUseCase();
        await useCase.handle(id);
    }

    await next();
};

export default VerifyTokenMiddleware;
