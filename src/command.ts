import 'reflect-metadata';
import { exit } from 'shelljs';
import commander from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import { loggerCli } from './Shared/Logger';

import AddUserRoleCommand from './User/Presentation/Commands/AddUserRoleCommand';
import AddUserCommand from './User/Presentation/Commands/AddUserCommand';
import AddRoleCommand from './Role/Presentation/Commands/AddRoleCommand';
import CreateVapID from './File/Presentation/Commands/CreateVapID';

import AssignRoleToUserCommand from './User/Presentation/Commands/AssingRoleToUserCommand';
import SyncRolesPermissionCommand from './Auth/Presentation/Commands/SyncRolesPermissionCommand';
import CreateBucketCommand from './File/Presentation/Commands/CreateBucketCommand';
import Seed from './App/Presentation/Commands/SeedCommand';
import initCommand from './initCommand';

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

        await program.parseAsync(process.argv);
        exit();
    }
    catch (error)
    {
        // TODO: Add exception mapping to handle errors like server express
        loggerCli.info('Error:', error);
        loggerCli.info(error.message);
        exit();
    }
})();
