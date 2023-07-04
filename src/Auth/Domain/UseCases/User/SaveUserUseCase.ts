import IUserDomain from '../../Entities/IUserDomain';
import EventHandler from '../../../../Shared/Infrastructure/Events/EventHandler';
import UserCreatedEvent from '../../../Infrastructure/Events/UserCreatedEvent';
import UserSavePayload from '../../Payloads/User/UserSavePayload';
import User from '../../Entities/User';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import { REPOSITORIES } from '../../../../Config/Injects';
import ValidatorSchema from '../../../../Shared/Utils/ValidatorSchema';
import UserRepSchemaValidation from '../../../Presentation/Validations/User/UserRepSchemaValidation';

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
        await ValidatorSchema.handle(UserRepSchemaValidation, payload);

        const user: IUserDomain = new User(payload);
        await this.repository.save(user, payload.password);

        this.eventHandler.execute(UserCreatedEvent.name, { email: user.email });

        return user;
    }
}

export default SaveUserUseCase;
