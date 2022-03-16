import Logger from '../../../Shared/Logger/Logger';
import commander from 'commander';
import RoleRepPayload from '../../Domain/Payloads/RoleRepPayload';
import SaveRoleUseCase from '../../Domain/UseCases/SaveRoleUseCase';
import RoleRepRequest from '../Requests/RoleRepRequest';

const AddRoleCommand = new commander.Command('addRole');

AddRoleCommand
    .version('0.0.1')
    .description('Add role to the system')
    .option('-n, --name <name>', 'Name of the role')
    .option('-s, --slug <slug>', 'Slug of the role')
    .action(async(env: any) =>
    {
        const saveRoleUseCase = new SaveRoleUseCase();

        const roleCommandRepRequest: RoleRepPayload = new RoleRepRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRepRequest);

        if (role)
        {
            Logger.info('Role created successfully.');
        }
    });

export default AddRoleCommand;
