import Cron from './Cron';
import Logger from '../Logger/Logger';

class TestCron extends Cron
{
    cronName(): string
    {
        return TestCron.name;
    }

    time(): string
    {
        return '* * * * *';
    }

    async task(): Promise<void>
    {
        Logger.debug('hello world 2021');
    }
}

export default TestCron;
