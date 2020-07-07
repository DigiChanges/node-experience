import { lazyInject } from '../../../inversify.config'
import UserRepPayload from "../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import EncryptionFactory from "../../../Lib/Factories/EncryptionFactory";
import IEncryptionStrategy from "../../../InterfaceAdapters/Shared/IEncryptionStrategy";
import User from "../../../Infrastructure/Entities/User";
import {REPOSITORIES} from "../../../repositories";

class SaveUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryptionStrategy;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: UserRepPayload): Promise<IUser>
    {
        const user: IUser = new User();
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

        await this.repository.save(user);

        return user;
    }
}

export default SaveUserUseCase;
