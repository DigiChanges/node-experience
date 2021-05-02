import {IEncryption} from '@digichanges/shared-experience';

import UserRepPayload from '../../InterfaceAdapters/Payloads/UserRepPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import EncryptionFactory from '../../../App/Infrastructure/Factories/EncryptionFactory';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import User from '../Entities/User';
import EventHandler from '../../../App/Infrastructure/Events/EventHandler';
import UserCreatedEvent from '../../../App/Infrastructure/Events/UserCreatedEvent';
import IAuthService from '../../../App/InterfaceAdapters/IAuthService';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';

class SaveUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;
    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: UserRepPayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(payload);

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