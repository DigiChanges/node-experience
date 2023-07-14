import { IBaseDomain } from '@digichanges/shared-experience';

interface INotificationDomain extends IBaseDomain
{
    name?: string;

    url?: string;

    emailTemplatePath?: string;
    senderName?: string;
    from?: string;
    to?: string;
    cc?: string;
    subject?: string;
    description?: string;
}

export default INotificationDomain;
