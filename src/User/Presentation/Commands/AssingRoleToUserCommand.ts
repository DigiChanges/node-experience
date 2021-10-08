import { loggerCli } from '../../../Shared/Logger';
import commander from 'commander';
import UserAssignRoleByCommandRequest from '../Requests/Express/UserAssignRoleByCommandRequest';
import UserAssignRoleByPayload from '../../InterfaceAdapters/Payloads/UserAssignRoleByPayload';
import AssignRoleBySlugUseCase from '../../Domain/UseCases/AssignRoleBySlugUseCase';

const AssignRoleToUserCommand = new commander.Command('assignRoleToUser');

AssignRoleToUserCommand
    .version('0.0.1')
    .description('Assign role to user')
    .option('-s, --slug <slug>', 'Slug of the role')
    .option('-e, --email <email>', 'Email of the user')
    .action(async(env: any) =>
    {
        const assign_role_by_slug_use_case = new AssignRoleBySlugUseCase();

        const request: UserAssignRoleByPayload = new UserAssignRoleByCommandRequest(env);
        const user = await assign_role_by_slug_use_case.handle(request);

        if (user)
        {
            loggerCli.info('Assign user to role successfully.');
        }
    });

export default AssignRoleToUserCommand;
