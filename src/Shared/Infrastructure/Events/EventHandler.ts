import { Subject } from 'rxjs';
import Logger from '../../Helpers/Logger/Logger';
import IEvent from './IEvent';

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

    public setEvent(_event: IEvent)
    {
        this.events.set(_event.name, _event.handle);

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
