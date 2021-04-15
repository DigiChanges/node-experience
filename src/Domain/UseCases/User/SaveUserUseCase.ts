import {IEncryption} from '@digichanges/shared-experience';

import UserRepPayload from '../../../InterfaceAdapters/Payloads/Users/UserRepPayload';
import IUserRepository from '../../../InterfaceAdapters/IRepositories/IUserRepository';
import EncryptionFactory from '../../../Infrastructure/Factories/EncryptionFactory';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IUserDomain from '../../../InterfaceAdapters/IDomain/IUserDomain';
import User from '../../Entities/User';
import EventHandler from '../../../Infrastructure/Events/EventHandler';
import UserCreatedEvent from '../../../Infrastructure/Events/UserCreatedEvent';
import IAuthService from '../../../InterfaceAdapters/IServices/IAuthService';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

class SaveUserUseCase
{
    private repository: IUserRepository;
    private authService: IAuthService;
    private encryption: IEncryption;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: UserRepPayload): Promise<IUserDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        let user: IUserDomain = new User();
        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.email = payload.getEmail();
        user.birthday = payload.getBirthday();
        user.documentType = payload.getDocumentType();
        user.documentNumber = payload.getDocumentNumber();
        user.gender = payload.getGender();
        user.phone = payload.getPhone();
        user.country = payload.getCountry();
        user.address = payload.getAddress();
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
