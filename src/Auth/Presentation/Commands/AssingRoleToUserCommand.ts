import commander from 'commander';
import UserAssignRoleByCommandRequest from '../Requests/User/UserAssignRoleByCommandRequest';
import UserAssignRoleBySlug from '../../Domain/Payloads/User/UserAssignRoleBySlug';
import AssignRoleBySlugUseCase from '../../Domain/UseCases/User/AssignRoleBySlugUseCase';
import Logger from '../../../Shared/Application/Logger/Logger';

const AssignRoleToUserCommand = new commander.Command('assignRoleToUser');

AssignRoleToUserCommand
    .version('0.0.1')
    .description('Assign role to user')
    .option('-s, --slug <slug>', 'Slug of the role')
    .option('-e, --email <email>', 'Email of the user')
    .action(async(env: any) =>
    {
        const assignRoleBySlugUseCase = new AssignRoleBySlugUseCase();

        const request: UserAssignRoleBySlug = new UserAssignRoleByCommandRequest(env);
        const user = await assignRoleBySlugUseCase.handle(request);

        if (user)
        {
            Logger.info('Assign user to role successfully.');
        }
    });

export default AssignRoleToUserCommand;
