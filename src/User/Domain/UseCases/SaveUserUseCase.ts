import IUserDomain from '../Entities/IUserDomain';
import EventHandler from '../../../Shared/Events/EventHandler';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';
import UserSavePayload from '../Payloads/UserSavePayload';
import UserService from '../Services/UserService';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';
import { SERVICES } from '../../../Config/Injects';

class SaveUserUseCase
{
    private userService: UserService;
    private eventHandler: EventHandler;

    constructor()
    {
        const { container } = getRequestContext();
        this.userService = container.resolve<UserService>(SERVICES.UserService);
        this.eventHandler = EventHandler.getInstance();
    }

    async handle(payload: UserSavePayload): Promise<IUserDomain>
    {
        const user: IUserDomain = await this.userService.create(payload);

        await this.eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, { email: user.email });

        return user;
    }
}

export default SaveUserUseCase;
