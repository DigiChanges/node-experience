import crons from '../../crons';

class CronFactory
{
    private crons = {
        ...crons
    }

    start(name: keyof CronFactory['crons'] = null): void
    {
        if (name)
        {
            this.one(name, 'start');
        }
        else
        {
            this.all('start');
        }
    }

    stop(name: keyof CronFactory['crons'] = null): void
    {
        if (name)
        {
            this.one(name, 'stop');
        }
        else
        {
            this.all('stop');
        }
    }

    private one(name: keyof CronFactory['crons'], method: 'start' | 'stop')
    {
        (new this.crons[name]())[method]();
    }

    private all(method: 'start' | 'stop'): void
    {
        for (const name of Object.keys(this.crons))
        {
            (new this.crons[< keyof CronFactory['crons']> name]())[method]();
        }
    }

}

export default CronFactory;
