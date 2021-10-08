import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import EventHandler from '../../../Shared/Events/EventHandler';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import UserService from '../Services/UserService';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';

class SaveUserUseCase
{

    private event_handler: EventHandler;
    private user_service = new UserService();

    constructor()
    {
        this.event_handler = EventHandler.getInstance();
    }

    async handle(payload: UserSavePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(payload);
        const user = await this.user_service.create(payload);

        await this.event_handler.execute(UserCreatedEvent.USER_CREATED_EVENT, { email: user.email });

        return user;
    }
}

export default SaveUserUseCase;
