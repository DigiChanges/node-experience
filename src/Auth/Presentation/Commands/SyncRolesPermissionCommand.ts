import Logger from '../../../Shared/Helpers/Logger/Logger';
import commander from 'commander';
import SyncPermissionsUseCase from '../../Domain/UseCases/Auth/SyncPermissionsUseCase';

const SyncRolesPermissionCommand = new commander.Command('syncRolesPermission');

SyncRolesPermissionCommand
    .version('0.0.2')
    .description('Sync permissions')
    .action(async() =>
    {
        const useCase = new SyncPermissionsUseCase();
        await useCase.handle();

        await Logger.info('Sync successfully.');
    });

export default SyncRolesPermissionCommand;
