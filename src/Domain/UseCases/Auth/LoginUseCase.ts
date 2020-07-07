import { lazyInject } from '../../../inversify.config'
import AuthPayload from "../../../InterfaceAdapters/Payloads/Auth/AuthPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import ErrorException from "../../../Lib/ErrorException";
import IEncryptionStrategy from "../../../InterfaceAdapters/Shared/IEncryptionStrategy";
import EncryptionFactory from "../../../Lib/Factories/EncryptionFactory";
import StatusCode from "../../../Presentation/Shared/StatusCode";
import TokenFactory from "../../../Lib/Factories/TokenFactory";
import {REPOSITORIES} from "../../../repositories";

class LoginUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryptionStrategy;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: AuthPayload)
    {
        const email = payload.email();
        const password = payload.password();
        const user =  await this.repository.getOneByEmail(email);

        if(user.enable === false)
        {
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Your user is disable');
        }

        if (! await this.encryption.compare(password, user.password))
        {
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Error credentials');
        }

        return this.tokenFactory.token(user);
    }
}

export default LoginUseCase;
