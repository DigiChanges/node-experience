import { loggerCli } from '../../../Shared/Logger';
import commander from 'commander';
import SyncRolesPermissionUseCase from '../../Domain/UseCases/SyncRolesPermissionUseCase';

const SyncRolesPermissionCommand = new commander.Command('syncRolesPermission');

SyncRolesPermissionCommand
    .version('0.0.1')
    .description('Sync permissions')
    .action(() =>
    {
        const sync_roles_permission_use_case = new SyncRolesPermissionUseCase();
        sync_roles_permission_use_case.handle();

        loggerCli.info('Sync successfully.');
    });

export default SyncRolesPermissionCommand;
