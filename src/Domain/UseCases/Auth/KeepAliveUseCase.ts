import { lazyInject } from '../../../inversify.config'
import KeepAlivePayload from "../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import TokenFactory from "../../../Infrastructure/Factories/TokenFactory";
import {REPOSITORIES} from "../../../repositories";

class KeepAliveUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: KeepAlivePayload)
    {
        const email = payload.email();

        const user = await this.repository.getOneByEmail(email);

        return this.tokenFactory.token(user);
    }
}

export default KeepAliveUseCase;
