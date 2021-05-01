import EventEmitter from 'promise-events';
import UserCreatedEvent from './UserCreatedEvent';
import ForgotPasswordEvent from './ForgotPasswordEvent';
import SendMessageEvent from './SendMessageEvent';

class EventHandler extends EventEmitter
{
    private static instance: EventHandler;

    private constructor()
    {
        super();
    }

    static getInstance(): EventHandler
    {
        if (!EventHandler.instance)
        {
            EventHandler.instance = new EventHandler();
        }

        return EventHandler.instance;
    }

    public async execute(event: string | symbol, ...args: any[])
    {
        await this.emit(event, ...args);
    }

    public async setListeners()
    {
        await this.on(UserCreatedEvent.USER_CREATED_EVENT, UserCreatedEvent.userCreatedListener);
        await this.on(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, ForgotPasswordEvent.forgotPasswordListener);
        await this.on(SendMessageEvent.SEND_MESSAGE_EVENT, SendMessageEvent.sendMessageListener);
    }
}

export default EventHandler;