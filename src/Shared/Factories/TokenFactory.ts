import MainConfig from '../../Config/mainConfig';
import { v4 as uuidv4 } from 'uuid';
import { ITokenRepository } from '@digichanges/shared-experience';

import JWTToken from '../../Auth/Domain/Models/JWTToken';
import IToken from '../../Auth/Domain/Models/IToken';
import IUserDomain from '../../User/Domain/Entities/IUserDomain';
import { REPOSITORIES } from '../../Config/Injects/repositories';
import ITokenDomain from '../../Auth/Domain/Entities/ITokenDomain';
import Token from '../../Auth/Domain/Entities/Token';
import { containerFactory } from '../Decorators/ContainerFactory';

// TODO: Change logic with payload to extend and add new payload
class TokenFactory
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    public async createToken(user: IUserDomain): Promise<IToken>
    {
        const config = MainConfig.getInstance();

        const expires: number = config.getConfig().jwt.expires;
        const secret: string = config.getConfig().jwt.secret;
        const id = uuidv4();

        const jWTToken = new JWTToken(id, expires, user, secret);

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
