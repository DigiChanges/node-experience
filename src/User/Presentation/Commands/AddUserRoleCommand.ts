import commander from 'commander';
import RoleRepPayload from '../../../Role/Domain/Payloads/RoleRepPayload';
import SaveRoleUseCase from '../../../Role/Domain/UseCases/SaveRoleUseCase';
import RoleCommandSaveRequest from '../../../Role/Presentation/Requests/RoleCommandSaveRequest';
import Logger from '../../../Shared/Logger/Logger';
import UserSavePayload from '../../Domain/Payloads/UserSavePayload';
import SaveUserUseCase from '../../Domain/UseCases/SaveUserUseCase';
import UserCommandSaveRequest from '../Requests/UserCommandSaveRequest';

const AddUserRoleCommand = new commander.Command('addUserRole');

AddUserRoleCommand
    .version('0.0.1')
    .description('Add user, role and assign it')
    .option('-r, --role <role>', 'Name of the role')
    .option('-e, --email <email>', 'Email of user')
    .option('-fn, --firstName <firstName>', 'First Name of the user')
    .option('-ln, --lastName <lastName>', 'Last Name of the user')
    .option('-p, --password <password>', 'Password of the user')
    .option('-dt, --documentType <documentType>', 'Document Type of the user')
    .option('-dn, --documentNumber <documentNumber>', 'Document Number of the user')
    .option('-g, --gender <gender>', 'Gender of the user')
    .option('-ph, --phone <phone>', 'Phone of the user')
    .option('-c, --country <country>', 'Country of the user')
    .option('-a, --address <address>', 'Address of the user')
    .option('-bir, --birthday <birthday>', 'Birthday of the user')
    .option('-isa, --isSuperAdmin <isSuperAdmin>', 'Set if User is Super Admin')
    .action(async(env: any) =>
    {
        const saveUserUseCase = new SaveUserUseCase();
        const saveRoleUseCase = new SaveRoleUseCase();

        const roleCommandRepRequest: RoleRepPayload = new RoleCommandSaveRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRepRequest);

        const userCommandRepRequest: UserSavePayload = new UserCommandSaveRequest(env, role);
        const user = await saveUserUseCase.handle(userCommandRepRequest);

        if (user && role)
        {
            Logger.info('User and Role created successfully.');
        }
    });

export default AddUserRoleCommand;
