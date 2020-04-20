import nodemailer from "nodemailer";
import IMail from "./IMail";
import config from "../../../config/config";
import ErrorException from "../ErrorException";
import StatusCode from "../StatusCode";
import logger from "../Logger";


class Mail implements IMail{
    
    private senderName: string;
    private from: string;
    private to: string;
    private cc: string;
    private subject: string;
    private html: string;

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

        let smtpConfig = {
            host: String(config.mail.host),
            port: Number(config.mail.port),
            secure: config.mail.secure === 'false' ? false : true
        };

        if(smtpConfig.secure){
            const auth = {
                            auth: {
                                    user: String(config.mail.username),
                                    pass: String(config.mail.password)
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