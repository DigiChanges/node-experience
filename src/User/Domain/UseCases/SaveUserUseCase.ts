import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import EventHandler from '../../../Shared/Events/EventHandler';
import UserCreatedEvent from '../../../Shared/Events/UserCreatedEvent';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import UserService from '../Services/UserService';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class SaveUserUseCase
{
    @containerFactory(SERVICES.IUserService)
    private user_service: UserService;

    private eventHandler: EventHandler;

    constructor()
    {
        this.eventHandler = EventHandler.getInstance();
    }

    async handle(payload: UserSavePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(payload);
        const user = await this.user_service.create(payload);

        await this.eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, { email: user.email });

        return user;
    }
}

export default SaveUserUseCase;
