import IUserDomain from '../Entities/IUserDomain';
import EventHandler from '../../../Shared/Events/EventHandler';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';
import UserSavePayload from '../Payloads/UserSavePayload';
import UserService from '../Services/UserService';

class SaveUserUseCase
{
    private userService = new UserService();
    private eventHandler = EventHandler.getInstance();

    async handle(payload: UserSavePayload): Promise<IUserDomain>
    {
        const user: IUserDomain = await this.userService.create(payload);

        await this.eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, { email: user.email });

        return user;
    }
}

export default SaveUserUseCase;
