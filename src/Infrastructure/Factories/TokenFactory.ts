import Config from "config";
import JWTToken from "../../Application/Shared/JWTToken";
import IToken from "../../InterfaceAdapters/Shared/IToken";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";
import { lazyInject } from "../../inversify.config";
import {REPOSITORIES} from "../../repositories";
import ITokenRepository from "../../InterfaceAdapters/IRepositories/ITokenRepository";
import ITokenDomain from "../../InterfaceAdapters/IInfrastructure/ITokenDomain";
import Token from "../Entities/Token";
import { v4 as uuidv4 } from 'uuid';

// TODO: Change logic with payload to extend and add new payload
class TokenFactory
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository;

    public async createToken(user: IUserDomain): Promise<IToken>
    {
        const expires: number = Config.get('jwt.expires');
        const secret: string = Config.get('jwt.secret');
        const id = uuidv4();

        const jWTToken = new JWTToken(id, expires, user, secret);

        const token: ITokenDomain = new Token();
        token.setId(id);
        token.hash = jWTToken.getHash();
        token.payload = jWTToken.getPayload();
        token.expires = jWTToken.getExpires();

        await this.repository.save(token);

        return jWTToken;
    };
}

export default TokenFactory;
