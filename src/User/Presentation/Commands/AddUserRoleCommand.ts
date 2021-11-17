import RoleRepPayload from '../../../Role/InterfaceAdapters/Payloads/RoleRepPayload';
import RoleCommandRepRequest from '../../../Role/Presentation/Requests/RoleUserCommandRepRequest';
import UserCommandSaveRequest from '../Requests/UserCommandSaveRequest';
import commander from 'commander';
import SaveUserUseCase from '../../Domain/UseCases/SaveUserUseCase';
import SaveRoleUseCase from '../../../Role/Domain/UseCases/SaveRoleUseCase';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import Logger from '../../../Shared/Logger/Logger';

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
    .option('-dn, --documentNumber <documentNumer>', 'Document Number of the user')
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

        const roleCommandRepRequest: RoleRepPayload = new RoleCommandRepRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRepRequest);

        const userCommandRepRequest: UserSavePayload = new UserCommandSaveRequest(env, role);
        const user = await saveUserUseCase.handle(userCommandRepRequest);

        if (user && role)
        {
            Logger.info('User and Role created successfully.');
        }
    });

export default AddUserRoleCommand;
