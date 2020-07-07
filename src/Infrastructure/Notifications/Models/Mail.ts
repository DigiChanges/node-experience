import nodemailer from "nodemailer";
import IMail from "../../../InterfaceAdapters/Shared/IMail";
import Config from "config";
import ErrorException from "../../../Application/Shared/ErrorException";
import StatusCode from "../../../Presentation/Shared/StatusCode";

class Mail implements IMail
{
    private readonly senderName: string;
    private readonly from: string;
    private readonly to: string;
    private readonly cc: string;
    private readonly subject: string;
    private readonly html: string;

    constructor(senderName: string, from: string, to: string, cc: string, subject: string, html: string)
    {
        this.senderName = senderName;
        this.from = from;
        this.to = to;
        this.cc = cc;
        this.subject = subject;
        this.html = html;
    }

    getSenderName(): string
    {
        return this.senderName;
    }

    getFrom(): string
    {
        return this.from;
    }

    getTo(): string
    {
        return this.to;
    }

    getCC(): string
    { 
        return this.cc;
    }

    getSubject(): string
    {
        return this.subject;
    }

    getHtml(): string
    {
        return this.html;
    }

    async sendMail(): Promise<any>
    {
        const host: string = Config.get('mail.host');
        const port: number = Config.get('mail.port');
        const secure: boolean = Config.get('mail.secure');

        console.log("MAIL");
        console.log(secure);

        let smtpConfig = {host, port, secure};

        if(smtpConfig.secure){
            const auth = {
                            auth: {
                                    user: String(Config.get('mail.username')),
                                    pass: String(Config.get('mail.password'))
                                }
                        };
            Object.assign(smtpConfig, auth);
        }

        let transporter = nodemailer.createTransport(smtpConfig);

        let mailData = {
            from: '"' + this.getSenderName() + '" <' + this.getFrom() + '>',
            to:  this.getTo(),
            subject: this.getSubject(),
            html: this.getHtml()
        };
        
        return await transporter.sendMail(mailData)
                                    .then((info: any) => {
                                        return true;
                                    })
                                    .catch((err: any) => {
                                        throw new ErrorException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Something is wrong. Please try again later.");
                                    });
    }
}

export default Mail;