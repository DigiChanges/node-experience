import { Subject } from 'rxjs';
import { IEvent } from './IEvent';

export interface IEventHandler
{
    execute(eventName: string, args: unknown): void;
    setEvent(_event: IEvent): void;
    removeListeners(): void;
}

type SubscribeEventProps = { eventName: string; args: Record<string, unknown>; }

export class EventHandler implements IEventHandler
{
    private eventSubject: Subject<any>;
    private events: Map<string, (args: any) => Promise<void>>;

    constructor()
    {
        this.events = new Map<string, (args: any) => Promise<void>>();
        this.eventSubject = new Subject<any>();

        this.eventSubject.subscribe((event: SubscribeEventProps) =>
        {
            const { eventName, args } = event;
            const eventHandler = this.events.get(eventName);

            if (eventHandler)
            {
                void (async() =>
                {
                    try
                    {
                        await eventHandler(args).then();
                    }
                    catch (error)
                    {
                        console.log(error);
                    }
                })();
            }
        });
    }


    public execute(eventName: string, args: any)
    {
        this.eventSubject.next({ eventName, args });
    }

    public setEvent(_event: IEvent)
    {
        if (this.events.has(_event.name))
        {
            return;
        }

        this.events.set(_event.name, _event.handle);
    }

    public async removeListeners()
    {
        this.eventSubject.complete();
    }
}

export default EventHandler;
