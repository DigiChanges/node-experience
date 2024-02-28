import Cron from '../Crons/Cron';

export interface ICronService
{
    setCrons(crons: Map<string, Cron>): void;
    startAll(): void;
    stopAll(): void;
}

export interface CronParams
{
    executeCrons: boolean;
}

class CronService implements ICronService
{
    #config: CronParams;
    #crons: Map<string, Cron>;

    constructor(config: CronParams)
    {
        this.#config = config;
    }

    setCrons(crons: Map<string, Cron>): void
    {
        this.#crons = crons;
    }

    startAll(): void
    {
        if (this.#config.executeCrons)
        {
            for (const [_, cron] of this.#crons)
            {
                cron.start();
            }
        }
    }

    stopAll(): void
    {
        for (const [_, cron] of this.#crons)
        {
            cron.stop();
        }
    }
}

export default CronService;
