import VerifyTokenBlacklistUseCase from '../../Domain/UseCases/VerifyTokenBlacklistUseCase';

const VerifyTokenMiddleware = async(req: any, response: any, next: any) =>
{
    try
    {
        const id = req?.tokenDecode?.id;

        if (id)
        {
            const use_case = new VerifyTokenBlacklistUseCase();
            await use_case.handle(id);
        }

        next();
    }
    catch (error)
    {
        next(error);
    }
};

export default VerifyTokenMiddleware;
