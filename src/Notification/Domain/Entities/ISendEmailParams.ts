import TypeNotificationEnum from '../Enum/TypeNotificationEnum';
import IEmailNotificationData from './IEmailNotificationData';
import IFileVersionDomain from '../../../File/Domain/Entities/IFileVersionDomain';

interface ISendEmailParams
{
    type: TypeNotificationEnum;
    event: string;
    args: Record<string, any>
    name: string;
    subject?: string;
    data?: IEmailNotificationData;
    files?: IFileVersionDomain[];
    to: string;
    cc?: string[];
    bcc?: string[];
    external?: boolean;
}

export default ISendEmailParams;
