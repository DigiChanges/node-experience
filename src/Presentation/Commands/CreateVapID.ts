import {loggerCli} from '../../Infrastructure/Shared/Logger';
import commander from 'commander';
import webpush from 'web-push';

const CreateVapID = new commander.Command('createVapID');

CreateVapID
    .version('0.0.1')
    .description('Generate VapID Keys')
    .action(async(env: any) => 
    {

        const vapidKeys = webpush.generateVAPIDKeys();

        if (vapidKeys)
        {
            loggerCli.info('publicKey:');
            loggerCli.info(vapidKeys.publicKey);
            loggerCli.info('privateKey:');
            loggerCli.info(vapidKeys.privateKey);
        }
    });

export default CreateVapID;