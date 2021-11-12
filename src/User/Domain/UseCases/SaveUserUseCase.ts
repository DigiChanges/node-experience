import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import EventHandler from '../../../Shared/Events/EventHandler';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class SaveUserUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;

    private eventHandler: EventHandler;

    constructor()
    {
        this.eventHandler = EventHandler.getInstance();
    }

    async handle(payload: UserSavePayload): Promise<IUserDomain>
    {
        const user = await this.userService.create(payload);

        await this.eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, { email: user.email });

        return user;
    }
}

export default SaveUserUseCase;
