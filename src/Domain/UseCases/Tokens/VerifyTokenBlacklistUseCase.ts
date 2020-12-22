import ITokenDomain from "../../../InterfaceAdapters/IInfraestructure/ITokenDomain";
import TokenBlackListedHttpException from "../../../Presentation/Exceptions/TokenBlackListedHttpException";
import GetTokenUseCase from "./GetTokenUseCase";

class VerifyTokenBlacklistUseCase
{
    async handle(token: ITokenDomain)
    {
        const getTokenUseCase = new GetTokenUseCase();
        const tokenSaved: ITokenDomain = await getTokenUseCase.handle(token.getId());

        if (tokenSaved.blackListed)
        {
            throw new TokenBlackListedHttpException();
        }

        return tokenSaved;
    }
}

export default VerifyTokenBlacklistUseCase;
