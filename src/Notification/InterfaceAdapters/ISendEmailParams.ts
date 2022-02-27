import TypeNotificationEnum from '../Domain/Enum/TypeNotificationEnum';
import IEmailNotificationData from './IEmailNotificationData';
import IFileDomain from '../../File/Domain/Entities/IFileDomain';

interface ISendEmailParams
{
    type: TypeNotificationEnum;
    event: string;
    args: Record<string, any>
    name: string;
    subject?: string;
    data?: IEmailNotificationData;
    files?: IFileDomain[];
    to: string;
    cc?: string[];
    bcc?: string[];
    external?: boolean;
}

export default ISendEmailParams;
