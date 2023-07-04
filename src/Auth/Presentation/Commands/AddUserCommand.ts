import commander from 'commander';
import SaveUserUseCase from '../../Domain/UseCases/User/SaveUserUseCase';
import ActiveUserByEmailUseCase from '../../Domain/UseCases/User/ActiveUserByEmailUseCase';
import UserSavePayload from '../../Domain/Payloads/User/UserSavePayload';
import Logger from '../../../Shared/Helpers/Logger/Logger';
import GetRoleUseCase from '../../Domain/UseCases/Role/GetRoleUseCase';
import AssignRoleByEmailUseCase from '../../Domain/UseCases/User/AssignRoleByEmailUseCase';
import dayjs from 'dayjs';
import logger from '../../../Shared/Helpers/Logger/Logger';

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
    .action(async(env: any) =>
    {
        const payload: UserSavePayload = {
            ...env,
            birthdate: dayjs(env.birthdate, 'yyyy-mm-dd').toDate(),
            roles: []
        };

        const saveUserUseCase = new SaveUserUseCase();
        await saveUserUseCase.handle(payload);
        await logger.info('User created successfully.');

        const activeUserUseCase = new ActiveUserByEmailUseCase();
        const user = await activeUserUseCase.handle({ email: env.email });
        await logger.info('User activated successfully.');

        const getOneRoleUseCase = new GetRoleUseCase();
        const role = await getOneRoleUseCase.handle({ id: env.role });
        await logger.info('Role found successfully.');

        const assignRoleByEmailUseCase = new AssignRoleByEmailUseCase();
        await assignRoleByEmailUseCase.handle({ rolesName: [role.name], email: user.email });
        await logger.info('Role assigned successfully.');

        if (user)
        {
            await Logger.info('User created successfully.');
        }
    });

export default AddUserCommand;
