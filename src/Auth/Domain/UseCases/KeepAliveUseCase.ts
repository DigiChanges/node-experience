import { ITokenRepository } from '@digichanges/shared-experience';
import KeepAlivePayload from '../../InterfaceAdapters/Payloads/KeepAlivePayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import TokenFactory from '../../../Shared/Factories/TokenFactory';
import { REPOSITORIES } from '../../../Config/repositories';
import SetTokenBlacklistUseCase from './SetTokenBlacklistUseCase';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ITokenDomain from '../../../Auth/InterfaceAdapters/ITokenDomain';

class KeepAliveUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.ITokenRepository)
    private token_repository: ITokenRepository<ITokenDomain>;
    private token_factory: TokenFactory;

    constructor()
    {
        this.token_factory = new TokenFactory();
    }

    async handle(payload: KeepAlivePayload)
    {
        const email = payload.get_email();
        const token_id = payload.get_token_id();

        const user = await this.repository.get_one_by_email(email);
        const token: any = await this.token_repository.getOne(token_id);

        const set_token_blacklist_use_case = new SetTokenBlacklistUseCase();
        await set_token_blacklist_use_case.handle(token);

        return await this.token_factory.createToken(user);
    }
}

export default KeepAliveUseCase;
