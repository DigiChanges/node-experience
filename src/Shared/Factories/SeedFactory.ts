import ISeed from '../InterfaceAdapters/ISeed';
import { loggerCli } from '../Logger';
import _ from 'lodash';

import seeds from '../../seed';

class SeedFactory
{
    private seeds: {[name:string]: ISeed } = {
        ...seeds
    }

    public async execute(name: string): Promise<any>
    {
        return !_.isUndefined(name) ? await this.one(name) : await this.all();
    }

    public list(): void
    {
        loggerCli.info('⬐ Seed List');
        for (const name of Object.keys(this.seeds))
        {
            loggerCli.info(`↳ ${name}`);
        }
    }

    public async init(): Promise<void>
    {
        await this.all();
    }

    private async one(name: string): Promise<void>
    {
        this.validateSeedName(name);

        await this.seeds[name].init();

        loggerCli.info(`→ ${name} run successfully ✔`);
    }

    private async all(): Promise<void>
    {
        loggerCli.info('⬐ All Seed Run');
        for await (const name of Object.keys(this.seeds))
        {
            await this.seeds[name].init();

            loggerCli.info(`↳ ${name} run successfully ✔`);
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
