interface IMail
{
    getSenderName(): string;
    getFrom(): string;
    getTo(): string;
    getCC(): string;
    getSubject(): string;
    getHtml(): string;
    sendMail(): Promise<any>;
}

export default IMail;