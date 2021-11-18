import Logger from '../../../Shared/Logger/Logger';
import commander from 'commander';
import SyncRolesPermissionUseCase from '../../Domain/UseCases/SyncRolesPermissionUseCase';

const SyncRolesPermissionCommand = new commander.Command('syncRolesPermission');

SyncRolesPermissionCommand
    .version('0.0.1')
    .description('Sync permissions')
    .action(() =>
    {
        const syncRolesPermissionUseCase = new SyncRolesPermissionUseCase();
        syncRolesPermissionUseCase.handle();

        Logger.info('Sync successfully.');
    });

export default SyncRolesPermissionCommand;
