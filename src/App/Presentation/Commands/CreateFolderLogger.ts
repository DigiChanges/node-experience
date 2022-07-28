import { Command } from 'commander';
import { mkdir  } from 'node:fs/promises';

const CreateFolderLogger = new Command('createFolderLogger');

CreateFolderLogger
    .alias('sfl')
    .version('0.0.1')
    .description('Create dir logs')
    .action(async() =>
    {
        const dir = './dist/src/logs';

        await mkdir(dir, {
            recursive: true
        });
    });

export default CreateFolderLogger;
