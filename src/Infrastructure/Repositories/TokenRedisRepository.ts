import {injectable} from "inversify";

import ITokenRepository from "../../InterfaceAdapters/IRepositories/ITokenRepository";

import ITokenDomain from "../../InterfaceAdapters/IInfraestructure/ITokenDomain";

import NotFoundException from "../Exceptions/NotFoundException";
import CacheFactory from "../Factories/CacheFactory";
import ICacheRepository from "../../InterfaceAdapters/IRepositories/ICacheRepository";
import Token from "../Entities/Token";

@injectable()
class TokenRedisRepository implements ITokenRepository
{
    private readonly repository: ICacheRepository;
    private readonly expire: number = 60;

    constructor()
    {
        this.repository = CacheFactory.createRedisCache();
    }

    async save (token: Token): Promise<ITokenDomain>
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
