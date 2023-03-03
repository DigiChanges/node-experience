import Koa from 'koa';
import VerifyTokenBlacklistUseCase from '../../Domain/UseCases/Auth/VerifyTokenBlacklistUseCase';

const VerifyTokenKoaMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    const id = ctx?.tokenDecode?.id;
    const container = ctx.container;

    if (id)
    {
        const useCase = new VerifyTokenBlacklistUseCase(container);
        await useCase.handle(id);
    }

    await next();
};

export default VerifyTokenKoaMiddleware;
