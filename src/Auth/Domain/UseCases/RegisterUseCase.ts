import { IEncryption } from '@digichanges/shared-experience';
import TokenFactory from '../../../Shared/Factories/TokenFactory';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import UserService from '../../../User/Domain/Services/UserService';
import EventHandler from '../../../Shared/Events/EventHandler';
import IToken from '../../InterfaceAdapters/IToken';
import UserSavePayload from '../../../User/InterfaceAdapters/Payloads/UserSavePayload';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';

class RegisterUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;
    private encryption: IEncryption;
    private tokenFactory: TokenFactory;
    private eventHandler: EventHandler;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
        this.eventHandler = EventHandler.getInstance();
    }

    async handle(payload: UserSavePayload): Promise<IToken>
    {
        const user = await this.userService.create(payload);

        await this.eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, { email: user.email });

        return this.tokenFactory.createToken(user);
    }
}

export default RegisterUseCase;
