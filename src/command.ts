import {exit} from 'shelljs';
import commander from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import {loggerCli} from './Infrastructure/Shared/Logger';

import AddUserRoleCommand from './Presentation/Commands/AddUserRoleCommand';
import AddUserCommand from './Presentation/Commands/AddUserCommand';
import AddRoleCommand from './Presentation/Commands/AddRoleCommand';
import CreateVapID from './Presentation/Commands/CreateVapID';

import AssignRoleToUserCommand from './Presentation/Commands/AssingRoleToUserCommand';
import SyncRolesPermissionCommand from './Presentation/Commands/SyncRolesPermissionCommand';
import CreateBucketCommand from './Presentation/Commands/CreateBucketCommand';
import initCommand from './initCommand';

(async() => 
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

        await program.parseAsync(process.argv);
        exit();
    }
    catch (error)
    {
        // TODO: Add exception mapping to handle errors like server express
        loggerCli.info('Error while connecting to the database', error);
        loggerCli.info(error.message);
        exit();
    }
})();
