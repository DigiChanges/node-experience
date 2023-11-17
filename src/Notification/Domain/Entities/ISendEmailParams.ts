import TypeNotificationEnum from '../Enum/TypeNotificationEnum';
import IEmailNotificationData from './IEmailNotificationData';
import IFilesAttachments from './IFilesAttachments';

interface ISendEmailParams
{
    type: TypeNotificationEnum;
    args: Record<string, any>
    name: string;
    subject?: string;
    data?: IEmailNotificationData;
    files?: IFilesAttachments[];
    to: string;
    cc?: string[];
    bcc?: string[];
    external?: boolean;
    templatePathNameFile?: string;
}

export default ISendEmailParams;
