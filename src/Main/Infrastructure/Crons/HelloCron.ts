import Cron from './Cron';
import Logger from '../../../Shared/Helpers/Logger';

class HelloCron extends Cron
{
    cronName(): string
    {
        return HelloCron.name;
    }

    time(): string
    {
        return '* * * * *';
    }

    async task(): Promise<void>
    {
        Logger.info('Hello world 2024');
    }
}

export default HelloCron;
