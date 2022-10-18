import MainConfig from '../../Config/MainConfig';
import { v4 as uuidv4 } from 'uuid';

import JWTToken from '../../Auth/Domain/Models/JWTToken';
import IToken from '../../Auth/Domain/Models/IToken';
import IUserDomain from '../../Auth/Domain/Entities/IUserDomain';
import { REPOSITORIES } from '../../Config/Injects';
import ITokenDomain from '../../Auth/Domain/Entities/ITokenDomain';
import Token from '../../Auth/Domain/Entities/Token';
import { getRequestContext } from '../Presentation/Shared/RequestContext';
import ITokenRepository from '../../Auth/Infrastructure/Repositories/ITokenRepository';

// TODO: Change logic with payload to extend and add new payload
class TokenFactory
{
    private repository: ITokenRepository<ITokenDomain>;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository);
    }

    public async createToken(user: IUserDomain): Promise<IToken>
    {
        const jwtConfig = MainConfig.getInstance().getConfig().jwt;

        const id = uuidv4();
        const jWTToken = new JWTToken(id, user, jwtConfig);

        const token: ITokenDomain = new Token();
        token.setId(id);
        token.hash = jWTToken.getHash();
        token.payload = jWTToken.getPayload();
        token.expires = jWTToken.getExpires();

        await this.repository.save(token);

        return jWTToken;
    }
}

export default TokenFactory;
