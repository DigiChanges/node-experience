import crons from '../../crons';
import MainConfig from '../../Config/mainConfig';

class CronFactory
{
    private readonly config = MainConfig.getInstance();

    private crons = {
        ...crons
    }

    start(name: keyof CronFactory['crons'] = null): void
    {
        if (name)
        {
            if (this.config.getConfig().executeCrons)
            {
                this.one(name, 'start');
            }
        }
        else
        {
            if (this.config.getConfig().executeCrons)
            {
                this.all('start');
            }
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
