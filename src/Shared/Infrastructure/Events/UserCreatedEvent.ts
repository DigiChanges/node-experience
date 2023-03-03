import Logger from '../../Application/Logger/Logger';

class UserCreatedEvent
{
    public static USER_CREATED_EVENT = 'USER_CREATED_EVENT';

    public static handle = async(props: any) =>
    {
        const { email } = props;

        Logger.info(`User ${email} Created!`);
    };
}

export default UserCreatedEvent;
