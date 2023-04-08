import commander from 'commander';
import Logger from '../../../Shared/Application/Logger/Logger';
import AssignRoleByEmailUseCase from '../../Domain/UseCases/User/AssignRoleByEmailUseCase';

const AssignRoleToUserCommand = new commander.Command('assignRoleToUser');

AssignRoleToUserCommand
    .version('0.0.1')
    .description('Assign role to user')
    .option('-s, --roleName <roleName>', 'Name of the role')
    .option('-e, --email <email>', 'Email of the user')
    .action(async(env: Record<string, string>) =>
    {
        const payload = {
            email: env.email,
            rolesName: [env.roleName]
        };

        const assignRoleByEmailUseCase = new AssignRoleByEmailUseCase();
        await assignRoleByEmailUseCase.handle(payload);

        void Logger.info('Assign user to role successfully.');
    });

export default AssignRoleToUserCommand;
