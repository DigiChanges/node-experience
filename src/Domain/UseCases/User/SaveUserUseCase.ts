import { lazyInject } from '../../../inversify.config'
import UserRepPayload from "../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import IEncryption from "../../../InterfaceAdapters/Shared/IEncryption";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import User from '../../Entities/User';
import EventHandler from "../../../Infrastructure/Events/EventHandler";
import UserCreatedEvent from "../../../Infrastructure/Events/UserCreatedEvent";

class SaveUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: UserRepPayload): Promise<IUserDomain>
    {
        let user: IUserDomain = new User();
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

        user = await this.repository.save(user);

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, {email: user.email});

        return user;
    }
}

export default SaveUserUseCase;
