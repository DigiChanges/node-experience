import Config from 'config';
import { v4 as uuidv4 } from 'uuid';
import { ITokenRepository } from '@digichanges/shared-experience';

import JWTToken from '../../Auth/Shared/JWTToken';
import IToken from '../../Auth/InterfaceAdapters/IToken';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import { REPOSITORIES } from '../../Config/repositories';
import ITokenDomain from '../../Auth/InterfaceAdapters/ITokenDomain';
import Token from '../../Auth/Domain/Entities/Token';
import { containerFactory } from '../Decorators/ContainerFactory';

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
        token.set_id(id);
        token.hash = jWTToken.get_hash();
        token.payload = jWTToken.get_payload();
        token.expires = jWTToken.get_expires();

        await this.repository.save(token);

        return jWTToken;
    }
}

export default TokenFactory;
