import Logger from '../Logger/Logger';

class UserCreatedEvent
{
    public static USER_CREATED_EVENT = 'USER_CREATED_EVENT';

    public static userCreatedListener = async(props: any) =>
    {
        const { email } = props;

        Logger.debug(`User ${email} Created!`);
    }
}

export default UserCreatedEvent;
