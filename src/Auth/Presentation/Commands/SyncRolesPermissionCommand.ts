import Logger from '../../../Shared/Application/Logger/Logger';
import commander from 'commander';
import AuthController from '../Controllers/AuthController';

const SyncRolesPermissionCommand = new commander.Command('syncRolesPermission');

SyncRolesPermissionCommand
    .version('0.0.1')
    .description('Sync permissions')
    .action(async() =>
    {
        const controller = new AuthController();
        await controller.syncRolesPermissions();

        await Logger.info('Sync successfully.');
    });

export default SyncRolesPermissionCommand;
