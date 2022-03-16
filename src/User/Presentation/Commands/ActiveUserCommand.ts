import commander from 'commander';
import Logger from '../../../Shared/Logger/Logger';
import ActiveUserUseCase from '../../Domain/UseCases/ActiveUserUseCase';

const ActiveUserCommand = new commander.Command('activeUser');

ActiveUserCommand
    .version('0.0.1')
    .description('Add user, role and assign it')
    .option('-e, --email <email>', 'Email of user')
    .action(async(env: any) =>
    {
        const activeUserUseCase = new ActiveUserUseCase();

        const request = {
            email: env.email
        };

        await activeUserUseCase.handle(request);

        Logger.info('User activated successfully.');
    });

export default ActiveUserCommand;
