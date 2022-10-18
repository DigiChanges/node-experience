import { DependencyContainer } from 'tsyringe';
import VerifyTokenBlacklistUseCase from '../../Domain/UseCases/Auth/VerifyTokenBlacklistUseCase';

const VerifyTokenExpressMiddleware = async(req: any, response: any, next: any) =>
{
    try
    {
        const id = req?.tokenDecode?.id;
        const container: DependencyContainer = req.container;

        if (id)
        {
            const useCase = new VerifyTokenBlacklistUseCase(container);
            await useCase.handle(id);
        }

        next();
    }
    catch (error)
    {
        next(error);
    }
};

export default VerifyTokenExpressMiddleware;
