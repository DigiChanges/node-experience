import { Command } from 'commander';
import SeedFactory from '../../../Shared/Factories/SeedFactory';

const Seed = new Command('seed');

Seed
    .alias('sd')
    .arguments('[name]')
    .version('0.0.1')
    .description('Run the seeds')
    .option('-l, --list', 'seed list')
    .action(async(name, options) =>
    {
        const seedFactory = new SeedFactory();

        if (options.list)
        {
            seedFactory.list();
        }
        else
        {
            await seedFactory.execute(name);
        }
    });

export default Seed;
