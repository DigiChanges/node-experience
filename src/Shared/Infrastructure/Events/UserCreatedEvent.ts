import Logger from '../../Application/Logger/Logger';
import { DataEventToken } from '@deepkit/event';
import IDataEvent from './IDataEvent';

class UserCreatedEvent extends DataEventToken<any> implements IDataEvent
{
    public static USER_CREATED_EVENT = 'USER_CREATED_EVENT';

    constructor()
    {
        super(UserCreatedEvent.USER_CREATED_EVENT);
    }

    public handle = async(props: any) =>
    {
        const { email } = props.data;

        await Logger.info(`User ${email} Created!`);
    };
}

export default UserCreatedEvent;
