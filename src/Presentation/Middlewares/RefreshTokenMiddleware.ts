import KeepAliveUseCase from "../../Domain/UseCases/Auth/KeepAliveUseCase";

const RefreshTokenMiddleware = async (req: any, response: any, next: any) =>
{
    try
    {
        const email = req?.tokenDecode ? req.tokenDecode.email : null;

        if (email)
        {
            const keepAliveUseCase = new KeepAliveUseCase();
            const payload = await keepAliveUseCase.handle({getEmail: () => email});

            req.refreshToken = payload.getHash();
        }

        next();
    }
    catch(error)
    {
        next(error);
    }
};

export default RefreshTokenMiddleware;
