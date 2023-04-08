import UserCommandSaveRequest from '../Requests/User/UserCommandSaveRequest';
import commander from 'commander';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import Logger from '../../../Shared/Application/Logger/Logger';

const AddUserCommand = new commander.Command('addUser');

AddUserCommand
    .version('0.0.1')
    .description('Add user to the system')
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
    .option('-bir, --birthdate <birthdate>', 'User`s birthdate')
    .option('-isa, --isSuperAdmin <isSuperAdmin>', 'Set if user is super admin')
    .action(async(env: Record<string, string>) =>
    {
        const saveUserUseCase = new SaveUserUseCase();

        const userCommandRepRequest: UserSavePayload = new UserCommandSaveRequest(env);
        const user = await saveUserUseCase.handle(userCommandRepRequest);

        if (user)
        {
            await Logger.info('User created successfully.');
        }
    });

export default AddUserCommand;
