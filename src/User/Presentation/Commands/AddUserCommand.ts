import UserCommandSaveRequest from '../Requests/UserCommandSaveRequest';
import { loggerCli } from '../../../Shared/Logger';
import commander from 'commander';
import SaveUserUseCase from '../../Domain/UseCases/SaveUserUseCase';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';

const AddUserCommand = new commander.Command('addUser');

AddUserCommand
    .version('0.0.1')
    .description('Add user to the system')
    .option('-e, --email <email>', 'Email of user')
    .option('-fn, --firstName <firstName>', 'First Name of the user')
    .option('-ln, --lastName <lastName>', 'Last Name of the user')
    .option('-dt, --documentType <documentType>', 'Document Type of the user')
    .option('-dn, --documentNumber <documentNumer>', 'Document Number of the user')
    .option('-g, --gender <gender>', 'Gender of the user')
    .option('-ph, --phone <phone>', 'Phone of the user')
    .option('-c, --country <country>', 'Country of the user')
    .option('-a, --address <address>', 'Address of the user')
    .option('-p, --password <password>', 'Password of the user')
    .option('-isa, --isSuperAdmin <isSuperAdmin>', 'Set if User is Super Admin')
    .action(async(env) =>
    {
        const saveUserUseCase = new SaveUserUseCase();

        const userCommandRepRequest: UserSavePayload = new UserCommandSaveRequest(env);
        const user = await saveUserUseCase.handle(userCommandRepRequest);

        if (user)
        {
            loggerCli.info('User created successfully.');
        }
    });

export default AddUserCommand;
