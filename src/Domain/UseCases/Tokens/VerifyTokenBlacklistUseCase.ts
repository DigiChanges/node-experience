import TokenBlackListedHttpException from "../../../Presentation/Exceptions/TokenBlackListedHttpException";
import GetTokenUseCase from "./GetTokenUseCase";
import Token from "../../../Infrastructure/Entities/Token";

class VerifyTokenBlacklistUseCase
{
    async handle(token: Token)
    {
        const getTokenUseCase = new GetTokenUseCase();
        const tokenSaved: Token = await getTokenUseCase.handle(token._id);

        if (tokenSaved.blackListed)
        {
            throw new TokenBlackListedHttpException();
        }

        return tokenSaved;
    }
}

export default VerifyTokenBlacklistUseCase;
