import { ScheduledTask, schedule } from 'node-cron';

abstract class Cron
{
    #scheduledTask: ScheduledTask;

    constructor(scheduled = false)
    {
        this.#scheduledTask = schedule(this.time(), () =>
        {
            void (async() =>
            {
                await this.task();
            })();
        }, {
            scheduled
        });
    }

    start(): void
    {
        this.#scheduledTask.start();
    }

    stop(): void
    {
        this.#scheduledTask.stop();
    }

    abstract time(): string;
    abstract task(): Promise<void>;
    abstract cronName(): string;
}

export default Cron;
