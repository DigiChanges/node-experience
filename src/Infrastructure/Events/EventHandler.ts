import events from "events";
import UserCreatedListener from "../Listeners/UserCreatedListener";

class EventHandler extends events.EventEmitter
{
    private static instance: EventHandler;

    private constructor()
    {
        super();
        this.setListeners();
    }

    static getInstance(): EventHandler
    {
        if (!EventHandler.instance)
        {
          EventHandler.instance = new EventHandler();
        }

        return EventHandler.instance;
    }

    public execute(event: string | symbol, ...args: any[])
    {
        this.emit(event, ...args);
    }

    private setListeners()
    {
        this.on('userCreated', UserCreatedListener);
    }
}

export default EventHandler;