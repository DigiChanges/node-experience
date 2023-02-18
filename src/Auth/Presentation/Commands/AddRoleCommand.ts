import Logger from '../../../Shared/Application/Logger/Logger';
import commander from 'commander';
import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';

const AddRoleCommand = new commander.Command('addRole');

AddRoleCommand
    .version('0.0.1')
    .description('Add role to the system')
    .option('-n, --name <name>', 'Name of the role')
    .option('-s, --slug <slug>', 'Slug of the role')
    .action(async(env: Record<string, any>) =>
    {
        const saveRoleUseCase = new SaveRoleUseCase();

        const body = {
            name: env.name,
            slug: env.slug?.toLowerCase() ?? env.name?.toLowerCase(),
            permissions: env.permissions ?? [],
            enable: env.enable ?? true
        };

        const role = await saveRoleUseCase.handle(body);

        if (role)
        {
            await Logger.info('Role created successfully.');
        }
    });

export default AddRoleCommand;
