import dotenv from 'dotenv';
dotenv.config();

import { exit } from 'shelljs';
import commander from 'commander';

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import './Shared/DI/container';
import CreateVapID from './Notification/Presentation/Commands/CreateVapID';

import SyncRolesPermissionCommand from './Auth/Presentation/Commands/SyncRolesPermissionCommand';
import Seed from './Main/Presentation/Commands/SeedCommand';
import initCommand from './initCommand';
import Logger from './Shared/Helpers/Logger';
import CreateBucketCommand from './File/Presentation/Commands/CreateBucketCommand';

void (async() =>
{
    try
    {
        await initCommand();

        const program = commander.program;

        program.addCommand(CreateVapID);
        program.addCommand(SyncRolesPermissionCommand);
        program.addCommand(Seed);
        program.addCommand(CreateBucketCommand);
        program.addCommand(Seed);
        await program.parseAsync(process.argv);
        exit();
    }
    catch (error)
    {
        Logger.error(error);
        exit();
    }
})();
