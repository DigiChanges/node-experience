import Logger from '../../../Shared/Helpers/Logger';
import commander from 'commander';
import webpush from 'web-push';

const CreateVapID = new commander.Command('createVapID');

CreateVapID
    .version('0.0.1')
    .description('Generate VapID Keys')
    .action(() =>
    {
        const vapidKeys = webpush.generateVAPIDKeys();

        if (vapidKeys)
        {
            void Logger.info('publicKey:');
            void Logger.info(vapidKeys.publicKey);
            void Logger.info('privateKey:');
            void Logger.info(vapidKeys.privateKey);
        }
    });

export default CreateVapID;
