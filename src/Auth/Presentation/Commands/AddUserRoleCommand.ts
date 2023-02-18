import commander from 'commander';
import RoleCommandSaveRequest from '../Requests/Role/RoleCommandSaveRequest';
import Logger from '../../../Shared/Application/Logger/Logger';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import UserCommandSaveRequest from '../Requests/User/UserCommandSaveRequest';
import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';

const AddUserRoleCommand = new commander.Command('addUserRole');

AddUserRoleCommand
    .version('0.0.1')
    .description('Add user, role and assign it')
    .option('-r, --role <role>', 'Role`s name')
    .option('-e, --email <email>', 'User`s email')
    .option('-fn, --firstName <firstName>', 'User`s first name')
    .option('-ln, --lastName <lastName>', 'User`s last name')
    .option('-p, --password <password>', 'User`s password')
    .option('-dt, --documentType <documentType>', 'User`s document type')
    .option('-dn, --documentNumber <documentNumber>', 'User`s document Number')
    .option('-g, --gender <gender>', 'User`s gender')
    .option('-ph, --phone <phone>', 'User`s phone')
    .option('-c, --country <country>', 'User`s country')
    .option('-a, --address <address>', 'User`s address')
    .option('-bir, --birthday <birthday>', 'User`s birthday')
    .option('-isa, --isSuperAdmin <isSuperAdmin>', 'Set if user is super admin')
    .action(async(env: Record<string, string>) =>
    {
        const saveUserUseCase = new SaveUserUseCase();
        const saveRoleUseCase = new SaveRoleUseCase();

        const roleCommandRepRequest: RoleRepPayload = new RoleCommandSaveRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRepRequest);

        const userCommandRepRequest: UserSavePayload = new UserCommandSaveRequest(env, role);
        const user = await saveUserUseCase.handle(userCommandRepRequest);

        if (user && role)
        {
            await Logger.info('User and Role created successfully.');
        }
    });

export default AddUserRoleCommand;
