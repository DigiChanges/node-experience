import Logger from '../../../Shared/Helpers/Logger/Logger';
import IEvent from '../../../Shared/Infrastructure/Events/IEvent';

class UserCreatedEvent implements IEvent
{
    public name: string = UserCreatedEvent.name;

    public handle = async(props: any) =>
    {
        const { email } = props;

        await Logger.info(`User ${email} Created!`);
    };
}

export default UserCreatedEvent;
