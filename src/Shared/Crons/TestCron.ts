import Cron from './Cron';

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
        console.log('hello world 2021');
    }
}

export default TestCron;
