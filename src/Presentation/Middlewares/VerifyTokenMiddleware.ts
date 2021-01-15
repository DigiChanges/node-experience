import VerifyTokenBlacklistUseCase from "../../Domain/UseCases/Tokens/VerifyTokenBlacklistUseCase";

const VerifyTokenMiddleware = async (req: any, response: any, next: any) =>
{
    try
    {
        const id = req?.tokenDecode?.id;

        if (id)
        {
            const useCase = new VerifyTokenBlacklistUseCase();
            await useCase.handle(id);
        }

        next();
    }
    catch(error)
    {
        next(error);
    }
};

export default VerifyTokenMiddleware;
