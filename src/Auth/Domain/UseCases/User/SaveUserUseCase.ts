import IUserDomain from '../../Entities/IUserDomain';
import EventHandler from '../../../../Shared/Infrastructure/Events/EventHandler';
import UserCreatedEvent from '../../../../Shared/Infrastructure/Events/UserCreatedEvent';
import UserSavePayload from '../../Payloads/User/UserSavePayload';
import User from '../../Entities/User';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import { REPOSITORIES } from '../../../../Config/Injects';

class SaveUserUseCase
{
    private eventHandler: EventHandler;
    private repository: IUserRepository;

    constructor()
    {
        this.eventHandler = EventHandler.getInstance();
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: UserSavePayload): Promise<IUserDomain>
    {
        const user: IUserDomain = new User(payload);
        await this.repository.save(user, payload.password);

        await this.eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, { email: user.email });

        return user;
    }
}

export default SaveUserUseCase;
