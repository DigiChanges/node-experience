import KeepAliveUseCase from '../../Domain/UseCases/KeepAliveUseCase';

const RefreshTokenMiddleware = async(req: any, response: any, next: any) =>
{
    try
    {
        const email = req?.tokenDecode ? req.tokenDecode.email : null;
        const id = req?.tokenDecode ? req.tokenDecode.id : null;

        if (id && email)
        {
            const keep_alive_use_case = new KeepAliveUseCase();
            const payload = await keep_alive_use_case.handle({ get_email: () => email, get_token_id: () => id });

            req.refreshToken = payload.get_hash();
        }

        next();
    }
    catch (error)
    {
        next(error);
    }
};

export default RefreshTokenMiddleware;
