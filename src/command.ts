import 'reflect-metadata';
import { exit } from 'shelljs';
import commander from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import './register';
import AddUserRoleCommand from './Auth/Presentation/Commands/AddUserRoleCommand';
import AddUserCommand from './Auth/Presentation/Commands/AddUserCommand';
import AddRoleCommand from './Auth/Presentation/Commands/AddRoleCommand';
import CreateVapID from './File/Presentation/Commands/CreateVapID';

import AssignRoleToUserCommand from './Auth/Presentation/Commands/AssingRoleToUserCommand';
import SyncRolesPermissionCommand from './Auth/Presentation/Commands/SyncRolesPermissionCommand';
import CreateBucketCommand from './File/Presentation/Commands/CreateBucketCommand';
import Seed from './Shared/Presentation/Commands/SeedCommand';
import initCommand from './initCommand';
import CreateFolderLogger from './Shared/Presentation/Commands/CreateFolderLogger';
import ActiveUserCommand from './Auth/Presentation/Commands/ActiveUserCommand';
import Logger from './Shared/Application/Logger/Logger';

void (async() =>
{
    try
    {
        await initCommand();

        const program = commander.program;

        program.addCommand(AddUserRoleCommand);
        program.addCommand(AddUserCommand);
        program.addCommand(AddRoleCommand);
        program.addCommand(AssignRoleToUserCommand);
        program.addCommand(CreateVapID);
        program.addCommand(SyncRolesPermissionCommand);
        program.addCommand(CreateBucketCommand);
        program.addCommand(Seed);
        program.addCommand(CreateFolderLogger);
        program.addCommand(ActiveUserCommand);

        await program.parseAsync(process.argv);
        exit();
    }
    catch (error)
    {
        // TODO: Add exception mapping to handle errors like server express
        Logger.error(error);
        exit();
    }
})();
