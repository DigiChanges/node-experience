import EventEmitter from 'promise-events';
import UserCreatedEvent from './UserCreatedEvent';
import ForgotPasswordEvent from './ForgotPasswordEvent';
import SendMessageEvent from './SendMessageEvent';
import RegisterEvent from './RegisterEvent';
import VerifiedAccountEvent from './VerifiedAccountEvent';

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
        await this.on(UserCreatedEvent.USER_CREATED_EVENT, UserCreatedEvent.handle);
        await this.on(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, ForgotPasswordEvent.handle);
        await this.on(SendMessageEvent.SEND_MESSAGE_EVENT, SendMessageEvent.handle);
        await this.on(RegisterEvent.REGISTER_EVENT, RegisterEvent.handle);
        await this.on(VerifiedAccountEvent.VERIFIED_ACCOUNT_EVENT, VerifiedAccountEvent.handle);
    }

    public async removeListeners()
    {
        await this.removeAllListeners(UserCreatedEvent.USER_CREATED_EVENT);
        await this.removeAllListeners(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT);
        await this.removeAllListeners(SendMessageEvent.SEND_MESSAGE_EVENT);
        await this.removeAllListeners(RegisterEvent.REGISTER_EVENT);
        await this.removeAllListeners(VerifiedAccountEvent.VERIFIED_ACCOUNT_EVENT);
    }
}

export default EventHandler;
