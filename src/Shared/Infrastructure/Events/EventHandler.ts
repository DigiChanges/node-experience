import { DataEventToken, EventDispatcher } from '@deepkit/event';
import UserCreatedEvent from './UserCreatedEvent';
import ForgotPasswordEvent from './ForgotPasswordEvent';
import SendMessageEvent from './SendMessageEvent';
import RegisterEvent from './RegisterEvent';
import VerifiedAccountEvent from './VerifiedAccountEvent';
import IDataEvent from './IDataEvent';

class EventHandler
{
    private static instance: EventHandler;
    private dispatcher: EventDispatcher;
    private readonly events: Map<string, IDataEvent & DataEventToken<any>>;

    private constructor()
    {
        this.dispatcher = new EventDispatcher();
        this.events = new Map<string, IDataEvent & DataEventToken<any>>();
    }

    static getInstance(): EventHandler
    {
        if (!EventHandler.instance)
        {
            EventHandler.instance = new EventHandler();
        }

        return EventHandler.instance;
    }

    public async execute(eventName: string, ...args: any[])
    {
        const eventToken = this.events.get(eventName);
        await this.dispatcher.dispatch(eventToken, ...args);
    }

    public async setListeners()
    {
        this.events.set(UserCreatedEvent.USER_CREATED_EVENT, new UserCreatedEvent());
        this.events.set(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, new ForgotPasswordEvent());
        this.events.set(SendMessageEvent.SEND_MESSAGE_EVENT, new SendMessageEvent());
        this.events.set(RegisterEvent.REGISTER_EVENT, new RegisterEvent());
        this.events.set(VerifiedAccountEvent.VERIFIED_ACCOUNT_EVENT, new VerifiedAccountEvent());

        for (const tuple of this.events)
        {
            const [, eventToken] = tuple;
            this.dispatcher.listen(eventToken, eventToken.handle);
        }
    }

    public async removeListeners()
    {
        // TODO: removeListeners
    }
}

export default EventHandler;
