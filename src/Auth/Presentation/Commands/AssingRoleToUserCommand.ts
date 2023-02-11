import commander from 'commander';
import UserAssignRoleByCommandRequest from '../Requests/User/UserAssignRoleByCommandRequest';
import UserAssignRoleBySlugPayload from '../../Domain/Payloads/User/UserAssignRoleBySlugPayload';
import AssignRoleBySlugUseCase from '../../Domain/UseCases/User/AssignRoleBySlugUseCase';
import Logger from '../../../Shared/Application/Logger/Logger';

const AssignRoleToUserCommand = new commander.Command('assignRoleToUser');

AssignRoleToUserCommand
    .version('0.0.1')
    .description('Assign role to user')
    .option('-s, --slug <slug>', 'Slug of the role')
    .option('-e, --email <email>', 'Email of the user')
    .action(async(env: Record<string, string>) =>
    {
        const assignRoleBySlugUseCase = new AssignRoleBySlugUseCase();

        const request: UserAssignRoleBySlugPayload = new UserAssignRoleByCommandRequest(env);
        const user = await assignRoleBySlugUseCase.handle(request);

        if (user)
        {
            void Logger.info('Assign user to role successfully.');
        }
    });

export default AssignRoleToUserCommand;
