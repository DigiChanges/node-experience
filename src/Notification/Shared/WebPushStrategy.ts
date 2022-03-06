import webPush from 'web-push';
import MainConfig from '../../Config/mainConfig';
import INotifierStrategy from './INotifierStrategy';
import PushNotification from '../Domain/Entities/PushNotification';

class WebPushStrategy implements INotifierStrategy
{
    private _pushNotification: PushNotification;
    private _message: string;
    private _save: boolean;

    constructor()
    {
        this._save = true;
    }

    get pushNotification(): PushNotification
    {
        return this._pushNotification;
    }

    set pushNotification(pushNotification: PushNotification)
    {
        this._pushNotification = pushNotification;
    }

    set message(message: string)
    {
        this._message = message;
    }

    get message(): string
    {
        return this._message;
    }

    get save(): boolean
    {
        return this._save;
    }

    set save(save: boolean)
    {
        this._save = save;
    }

    public async send()
    {
        const config = MainConfig.getInstance();

        try
        {
            const publicKey: string = config.getConfig().push.publicKey;
            const privateKey: string = config.getConfig().push.privateKey;
            const subject: string = config.getConfig().url.urlWeb;

            const pushSubscription = this._pushNotification.getSubscription();

            const payload = JSON.stringify({
                name: this._pushNotification.name,
                message: this._message
            });

            const options = {
                vapidDetails: {
                    subject,
                    publicKey,
                    privateKey
                }
            };

            return await webPush.sendNotification(pushSubscription, payload, options);
        }
        catch (e)
        {
            throw Error('Error to send Push Notification');
        }
    }
}

export default WebPushStrategy;
