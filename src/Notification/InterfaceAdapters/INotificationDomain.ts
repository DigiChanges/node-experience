import IBaseDomain from '../../App/InterfaceAdapters/IBaseDomain';

interface INotificationDomain extends IBaseDomain
{
    name?: string;

    url?: string;

    email_template_path?: string;
    sender_name?: string;
    from?: string;
    to?: string;
    cc?: string;
    subject?: string;
    description?: string;
}

export default INotificationDomain;
