import { Command } from 'commander';
import fs from 'fs';

const CreateFolderLogger = new Command('createFolderLogger');

CreateFolderLogger
    .alias('sfl')
    .version('0.0.1')
    .description('Create dir logs')
    .action(async(name, options) =>
    {
        const dir = './dist/src/logs';

        if (!fs.existsSync(dir))
        {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
    });

export default CreateFolderLogger;
