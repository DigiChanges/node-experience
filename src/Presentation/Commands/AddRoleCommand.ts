import {loggerCli} from '../../Infrastructure/Shared/Logger';
import commander from 'commander';
import RoleRepPayload from '../../InterfaceAdapters/Payloads/Roles/RoleRepPayload';
import RoleCommandRepRequest from '../Requests/Command/Requests/RoleUserCommandRepRequest';
import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';

const AddRoleCommand = new commander.Command('addRole');

AddRoleCommand
    .version('0.0.1')
    .description('Add role to the system')
    .option('-n, --name <name>', 'Name of the role')
    .option('-s, --slug <slug>', 'Slug of the role')
    .action(async(env: any) =>
    {
        const saveRoleUseCase = new SaveRoleUseCase();

        const roleCommandRepRequest: RoleRepPayload = new RoleCommandRepRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRepRequest);

        if (role)
        {
            loggerCli.info('Role created successfully.');
        }
    });

export default AddRoleCommand;
