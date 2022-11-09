import { ScheduledTask, schedule } from 'node-cron';
import Logger from '../../../Shared/Application/Logger/Logger';

abstract class Cron
{
    private scheduledTask: ScheduledTask;

    constructor(scheduled = false)
    {
        this.scheduledTask = schedule(this.time(), () =>
        {
            // TODO: Log start time and end time of each executed cron
            void (async() =>
            {
                Logger.info(`Running ${this.cronName()}`);
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
