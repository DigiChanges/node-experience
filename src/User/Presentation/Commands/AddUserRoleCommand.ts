import RoleRepPayload from '../../../Role/InterfaceAdapters/Payloads/RoleRepPayload';
import RoleCommandRepRequest from '../../../Role/Presentation/Requests/Express/RoleUserCommandRepRequest';
import UserCommandSaveRequest from '../Requests/Express/UserCommandSaveRequest';
import { loggerCli } from '../../../Shared/Logger';
import commander from 'commander';
import SaveUserUseCase from '../../Domain/UseCases/SaveUserUseCase';
import SaveRoleUseCase from '../../../Role/Domain/UseCases/SaveRoleUseCase';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';

const AddUserRoleCommand = new commander.Command('addUserRole');

AddUserRoleCommand
    .version('0.0.1')
    .description('Add user, role and assign it')
    .option('-r, --role <role>', 'Name of the role')
    .option('-e, --email <email>', 'Email of user')
    .option('-fn, --first_name <firstName>', 'First Name of the user')
    .option('-ln, --last_name <lastName>', 'Last Name of the user')
    .option('-p, --password <password>', 'Password of the user')
    .option('-dt, --document_type <documentType>', 'Document Type of the user')
    .option('-dn, --document_number <documentNumer>', 'Document Number of the user')
    .option('-g, --gender <gender>', 'Gender of the user')
    .option('-ph, --phone <phone>', 'Phone of the user')
    .option('-c, --country <country>', 'Country of the user')
    .option('-a, --address <address>', 'Address of the user')
    .option('-bir, --birthday <birthday>', 'Birthday of the user')
    .option('-isa, --is_super_admin <isSuperAdmin>', 'Set if User is Super Admin')
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
            loggerCli.info('User and Role created successfully.');
        }
    });

export default AddUserRoleCommand;
