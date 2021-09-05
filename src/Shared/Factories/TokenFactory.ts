import Config from 'config';
import {v4 as uuidv4} from 'uuid';
import {ITokenRepository} from '@digichanges/shared-experience';

import JWTToken from '../../Auth/Shared/JWTToken';
import IToken from '../../Auth/InterfaceAdapters/IToken';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import {REPOSITORIES} from '../../repositories';
import ITokenDomain from '../../Auth/InterfaceAdapters/ITokenDomain';
import Token from '../../Auth/Domain/Entities/Token';
import {containerFactory} from '../Decorators/ContainerFactory';

// TODO: Change logic with payload to extend and add new payload
class TokenFactory
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

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
    }
}

export default TokenFactory;
