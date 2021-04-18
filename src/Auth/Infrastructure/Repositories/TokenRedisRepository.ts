import Config from 'config';
import {injectable} from 'inversify';
import {ICacheRepository, ITokenRepository} from '@digichanges/shared-experience';

import ITokenDomain from '../../../App/InterfaceAdapters/ITokenDomain';

import NotFoundException from '../../../App/Infrastructure/Exceptions/NotFoundException';
import CacheFactory from '../../../App/Infrastructure/Factories/CacheFactory';
import Token from '../../../App/Infrastructure/Entities/Token';

@injectable()
class TokenRedisRepository implements ITokenRepository<ITokenDomain>
{
    private readonly repository: ICacheRepository;
    private readonly expire: number = Math.floor((+Config.get('jwt.expires') + 10) * 60);

    constructor()
    {
        this.repository = CacheFactory.createRedisCache();
    }

    async save(token: Token): Promise<ITokenDomain>
    {
        await this.repository.jset(token._id, token, this.expire);
        return token;
    }

    async update(token: Token): Promise<ITokenDomain>
    {
        await this.repository.jset(token._id, token);
        return token;
    }

    async getOne(id: string): Promise<ITokenDomain>
    {
        const token = await this.repository.jget(id);

        if (!token)
        {
            throw new NotFoundException('Token');
        }

        return token;
    }
}

export default TokenRedisRepository;
