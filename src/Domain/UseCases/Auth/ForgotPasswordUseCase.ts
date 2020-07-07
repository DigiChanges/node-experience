import { lazyInject } from '../../../inversify.config'
import ForgotPasswordPayload from "../../../InterfaceAdapters/Payloads/Auth/ForgotPasswordPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import Config from "config";
import Mail from "../../../Infrastructure/Notifications/Models/Mail";
import {REPOSITORIES} from "../../../repositories";

class ForgotPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ForgotPasswordPayload)
    {
        const user = await this.repository.getOneByEmail(payload.email());

        user.confirmationToken = String(await payload.confirmationToken());
        user.passwordRequestedAt = payload.passwordRequestedAT();

        await this.repository.update(user);

        let urlConfirmationToken: string = Config.get('url.urlWeb') + 'changeForgotPassword/' + user.confirmationToken;
        let senderName: string = Config.get('mail.senderName');
        let from: string = Config.get('mail.senderEmailDefault');
        let to = payload.email();
        let cc = "";
        let subject = "Password Recovery";
        let html = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <title></title>
                        </head>
                        <body>
                            <p>Hello</p>
                            <p>You can change your pass from this <a href="${urlConfirmationToken}" target="_blank">link</a></p>
                            <br>
                            <br>
                            <p>Cheers,</p>
                            <p>The team</p>
                        </body>
                        </html>`;

        // TODO: Add factoring with notifications logic
        let mail = new Mail(senderName, from, to, cc, subject, html);
        let sendMailer = await mail.sendMail();

        return {message: "We've sent you an email"};
    }
}

export default ForgotPasswordUseCase;
