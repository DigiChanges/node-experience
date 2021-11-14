import { ScheduledTask, schedule } from 'node-cron';

abstract class Cron
{
    private readonly name: string
    private scheduledTask: ScheduledTask

    constructor(scheduled = false)
    {
        this.scheduledTask = schedule(this.time(), () =>
        {
            // TODO: Log start time and end time of each executed cron
            void (async() =>
            {
                console.log(`Running ${this.cronName()}`);
                await this.task();
            })();
        }, {
            scheduled
        });
    }

    start(): ScheduledTask
    {
        return this.scheduledTask.start();
    }

    stop(): ScheduledTask
    {
        return this.scheduledTask.stop();
    }

    abstract time(): string;
    abstract task(): Promise<void>;
    abstract cronName(): string;
}

export default Cron;
