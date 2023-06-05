import { Subject } from 'rxjs';
import UserCreatedEvent from './UserCreatedEvent';
import Logger from '../../Application/Logger/Logger';
import ForgotPasswordEvent from './ForgotPasswordEvent';
import SendMessageEvent from './SendMessageEvent';
import RegisterEvent from './RegisterEvent';
import VerifiedAccountEvent from './VerifiedAccountEvent';

class EventHandler
{
    private static instance: EventHandler;
    private eventSubject: Subject<any>;
    private events: Map<string, (args: any) => Promise<void>>;

    private constructor()
    {
        this.events = new Map<string, (args: any) => Promise<void>>();
        this.eventSubject = new Subject<any>();
    }

    static getInstance(): EventHandler
    {
        if (!EventHandler.instance)
        {
            EventHandler.instance = new EventHandler();
        }

        return EventHandler.instance;
    }

    public execute(eventName: string, args: any)
    {
        this.eventSubject.next({ eventName, args });
    }

    public setListeners()
    {
        this.events.set(UserCreatedEvent.USER_CREATED_EVENT, UserCreatedEvent.handle);
        this.events.set(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, ForgotPasswordEvent.handle);
        this.events.set(SendMessageEvent.SEND_MESSAGE_EVENT, SendMessageEvent.handle);
        this.events.set(RegisterEvent.REGISTER_EVENT, RegisterEvent.handle);
        this.events.set(VerifiedAccountEvent.VERIFIED_ACCOUNT_EVENT, VerifiedAccountEvent.handle);

        this.eventSubject.subscribe((event) =>
        {
            const { eventName, args } = event;
            const eventHandler = this.events.get(eventName);

            if (eventHandler)
            {
                void (async() =>
                {
                    try
                    {
                        await eventHandler(args);
                    }
                    catch (error)
                    {
                        await Logger.error(error);
                    }
                })();
            }
        });
    }

    public async removeListeners()
    {
        this.eventSubject.complete();
    }
}

export default EventHandler;
