import { Command } from 'commander';
import SeedFactory from '../../../Shared/Factories/SeedFactory';

const Seed = new Command('seed');

Seed
    .alias('sd')
    .arguments('[name]')
    .version('0.0.1')
    .description('Run the seeds', {
        name: 'name of the seed'
    })
    .option('-l, --list', 'seed list')
    .action(async(name, options) =>
    {
        const seed_factory = new SeedFactory();

        if (options.list)
        {
            seed_factory.list();
        }
        else
        {
            await seed_factory.execute(name);
        }
    });

export default Seed;
