import {loggerCli} from '../Shared/Logger';

class UserCreatedEvent
{
    public static USER_CREATED_EVENT = 'USER_CREATED_EVENT';

    public static userCreatedListener = (props: any) =>
    {
        const {email} = props;

        loggerCli.debug(`User ${email} Created!`);
    }
}

export default UserCreatedEvent;