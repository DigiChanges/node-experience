
interface INotificationDomain
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

    createdAt: Date;
    updatedAt: Date;

    getId(): string;
}

export default INotificationDomain;
