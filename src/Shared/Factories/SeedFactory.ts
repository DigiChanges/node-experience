import seeds from '../../seed';
import Logger from '../Helpers/Logger';

class SeedFactory
{
    private seeds = {
        ...seeds
    };

    public async execute(name: string): Promise<any>
    {
        return (typeof name) !== 'undefined' ? await this.one(name) : await this.all();
    }

    public list(): void
    {
        Logger.info('⬐ Seed List');
        Object.keys(this.seeds).forEach(name =>  Logger.info(`↳ ${name}`));
    }

    public async init(): Promise<void>
    {
        await this.all();
    }

    private async one(name: string): Promise<void>
    {
        this.validateSeedName(name);

        await (new this.seeds[name]()).init();

        Logger.info(`→ ${name} run successfully ✔`);
    }

    private async all(): Promise<void>
    {
        Logger.info('⬐ All Seed Run');
        for await (const name of Object.keys(this.seeds))
        {
            await (new this.seeds[name]()).init();

            Logger.info(`↳ ${name} run successfully ✔`);
        }
    }

    private validateSeedName(name: string): void
    {
        if (Object.prototype.hasOwnProperty.call(this.seeds, name))
        {
            return;
        }

        const invalidSeedMessage = (
            text: TemplateStringsArray,
            seed: string
        ) => `The seed '${seed}' is not defined or does not exist.`;

        throw new Error(invalidSeedMessage`${name}`);
    }
}

export default SeedFactory;
