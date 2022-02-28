import Notification from './Notification';
import StatusNotificationEnum from '../Enum/StatusNotificationEnum';
import TypeNotificationEnum from '../Enum/TypeNotificationEnum';
import IFileDomain from '../../../File/Domain/Entities/IFileDomain';
import IEmailNotificationData from '../../InterfaceAdapters/IEmailNotificationData';
import IFilesAttachments from '../../InterfaceAdapters/IFilesAttachments';

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
    attachedFiles?: IFileDomain[];
    data?: IEmailNotificationData;
    tempFilesAttachments: IFilesAttachments[];

    constructor()
    {
        super();
    }

    getAttachedFiles(): IFileDomain[]
    {
        return this.attachedFiles;
    }
}

export default EmailNotification;
