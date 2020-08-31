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
        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.email = payload.getEmail();
        user.password = await this.encryption.encrypt(payload.getPassword());
        user.enable = payload.getEnable();
        user.confirmationToken = payload.getConfirmationToken();
        user.passwordRequestedAt = payload.getPasswordRequestedAt();
        user.permissions = payload.getPermissions();
        user.roles = payload.getRoles();
        user.isSuperAdmin = payload.getIsSuperAdmin();

        return await this.repository.save(user);
    }
}

export default SaveUserUseCase;
