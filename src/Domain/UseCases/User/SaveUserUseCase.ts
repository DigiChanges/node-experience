import { lazyInject } from '../../../inversify.config'
import UserRepPayload from "../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import IEncryptionStrategy from "../../../InterfaceAdapters/Shared/IEncryptionStrategy";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import User from '../../Entities/User';

class SaveUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryptionStrategy;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: UserRepPayload): Promise<IUserDomain>
    {
        const user: IUserDomain = new User();
        user.firstName = payload.firstName();
        user.lastName = payload.lastName();
        user.email = payload.email();
        user.password = await this.encryption.encrypt(payload.password());
        user.enable = payload.enable();
        user.confirmationToken = payload.confirmationToken();
        user.passwordRequestedAt = payload.passwordRequestedAt();
        user.permissions = payload.permissions();
        user.roles = payload.roles();
        user.isSuperAdmin = payload.isSuperAdmin();

        return await this.repository.save(user);
    }
}

export default SaveUserUseCase;
