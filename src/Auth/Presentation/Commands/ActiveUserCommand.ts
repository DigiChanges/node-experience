import commander from 'commander';
import Logger from '../../../Shared/Application/Logger/Logger';
import ActiveUserUseCase from '../../Domain/UseCases/User/ActiveUserUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';

const ActiveUserCommand = new commander.Command('activeUser');


ActiveUserCommand
    .version('0.0.1')
    .description('Add user, role and assign it')
    .option('-e, --email <email>', 'Email of user')
    .action(async(env: Record<string, string>) =>
    {
        const activeUserUseCase = new ActiveUserUseCase();

        const request = {
            email: env.email
        };

        await activeUserUseCase.handle(request);

        await Logger.info('User activated successfully.');
    });

export default ActiveUserCommand;
