import {IEncryption} from '@digichanges/shared-experience';

import UserRepPayload from '../../InterfaceAdapters/Payloads/UserRepPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import User from '../Entities/User';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import IAuthService from '../../../Auth/InterfaceAdapters/IAuthService';
import EventHandler from '../../../Shared/Events/EventHandler';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';

class SaveUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;
    private encryption: IEncryption;

    private eventHandler: EventHandler;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
        this.eventHandler = EventHandler.getInstance();
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

        await this.eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, {email: user.email});

        return user;
    }
}

export default SaveUserUseCase;
