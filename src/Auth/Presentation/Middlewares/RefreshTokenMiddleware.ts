import KeepAliveUseCase from '../../Domain/UseCases/KeepAliveUseCase';

const RefreshTokenMiddleware = async(req: any, response: any, next: any) =>
{
    try
    {
        const email = req?.tokenDecode ? req.tokenDecode.email : null;
        const id = req?.tokenDecode ? req.tokenDecode.id : null;

        if (id && email)
        {
            const keepAliveUseCase = new KeepAliveUseCase();
            const payload = await keepAliveUseCase.handle({ getEmail: () => email, getTokenId: () => id });

            req.refreshToken = payload.getHash();
        }

        next();
    }
    catch (error)
    {
        next(error);
    }
};

export default RefreshTokenMiddleware;
