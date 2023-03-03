import Notification from './Notification';
import StatusNotificationEnum from '../Enum/StatusNotificationEnum';
import TypeNotificationEnum from '../Enum/TypeNotificationEnum';
import IFileVersionDomain from '../../../File/Domain/Entities/IFileVersionDomain';
import IEmailNotificationData from './IEmailNotificationData';
import IFilesAttachments from './IFilesAttachments';

class EmailNotification extends Notification
{
    status: StatusNotificationEnum;
    type: TypeNotificationEnum;
    emailTemplatePath: string;
    htmlRender: string;
    senderName: string;
    from: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    external: boolean;
    attachedFiles?: IFileVersionDomain[];
    data?: IEmailNotificationData;
    tempFilesAttachments: IFilesAttachments[];

    constructor()
    {
        super();
    }

    getAttachedFiles(): IFileVersionDomain[]
    {
        return this.attachedFiles;
    }
}

export default EmailNotification;
