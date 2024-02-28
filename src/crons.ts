import TestCron from './Main/Infrastructure/Crons/TestCron';
import HelloCron from './Main/Infrastructure/Crons/HelloCron';
import Cron from './Main/Infrastructure/Crons/Cron';

const crons: Map<string, Cron> = new Map();
crons.set('TestCron', new TestCron());
crons.set('HelloCron', new HelloCron());

export default crons;
