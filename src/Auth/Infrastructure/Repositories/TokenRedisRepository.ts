import MainConfig from '../../../Config/mainConfig';
import { injectable } from 'inversify';
import { ICacheRepository, ITokenRepository } from '@digichanges/shared-experience';

import ITokenDomain from '../../Domain/Entities/ITokenDomain';

import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import CacheFactory from '../../../Shared/Factories/CacheFactory';
import Token from '../../Domain/Entities/Token';

@injectable()
class TokenRedisRepository implements ITokenRepository<ITokenDomain>
{
    private readonly repository: ICacheRepository;
    private readonly expire: number;

    constructor()
    {
        this.repository = CacheFactory.createRedisCache();
        const config = MainConfig.getInstance();
        this.expire = Math.floor((+config.getConfig().jwt.expires + 10) * 60);
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
