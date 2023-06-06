import commander from 'commander';
import UserCommandSaveRequest from '../Requests/User/UserCommandSaveRequest';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import ActiveUserByEmailUseCase from '../../Domain/UseCases/User/ActiveUserByEmailUseCase';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import Logger from '../../../Shared/Application/Logger/Logger';
import GetRoleUseCase from '../../Domain/UseCases/Role/GetRoleUseCase';
import AssignRoleByEmailUseCase from '../../Domain/UseCases/User/AssignRoleByEmailUseCase';

const AddUserCommand = new commander.Command('addUser');

AddUserCommand
    .version('0.0.2')
    .description('Add user to the system')
    .option('-r, --role <role>', 'User`s role')
    .option('-e, --email <email>', 'User`s email')
    .option('-fn, --firstName <firstName>', 'User`s first name')
    .option('-ln, --lastName <lastName>', 'User`s last name')
    .option('-p, --password <password>', 'User`s password')
    .option('-g, --genre <genre>', 'User`s genre')
    .option('-ph, --phone <phone>', 'User`s phone')
    .option('-c, --country <country>', 'User`s country')
    .option('-bir, --birthdate <birthdate>', 'User`s birthdate')
    .action(async(env: Record<string, string>) =>
    {
        const saveUserUseCase = new SaveUserUseCase();

        const userCommandRepRequest: UserSavePayload = new UserCommandSaveRequest(env);
        await saveUserUseCase.handle(userCommandRepRequest);

        const activeUserUseCase = new ActiveUserByEmailUseCase();
        const user = await activeUserUseCase.handle({ email: env.email });

        const getOneRoleUseCase = new GetRoleUseCase();
        const role = await getOneRoleUseCase.handle({ id: env.role });

        const assignRoleByEmailUseCase = new AssignRoleByEmailUseCase();
        await assignRoleByEmailUseCase.handle({ rolesName: [role.name], email: user.email });

        if (user)
        {
            await Logger.info('User created successfully.');
        }
    });

export default AddUserCommand;
