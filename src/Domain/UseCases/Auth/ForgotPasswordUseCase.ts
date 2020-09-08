import { lazyInject } from '../../../inversify.config'
import ForgotPasswordPayload from "../../../InterfaceAdapters/Payloads/Auth/ForgotPasswordPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import Config from "config";
import {REPOSITORIES} from "../../../repositories";
import EventHandler from "../../../Infrastructure/Events/EventHandler";
import nodemailer from "nodemailer";
import EmailTemplate from "email-templates";
import Handlebars from "handlebars";
import Fs from "fs";
import EmailNotification from "../../../Infrastructure/Entities/EmailNotification";
import Notificator from "../../../Infrastructure/Notifications/Notificator";

class ForgotPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ForgotPasswordPayload)
    {
        const user = await this.repository.getOneByEmail(payload.email());

        user.confirmationToken = String(await payload.confirmationToken());
        user.passwordRequestedAt = payload.passwordRequestedAT();

        const emailNotification = new EmailNotification();

        let urlConfirmationToken: string = Config.get('url.urlWeb') + 'changeForgotPassword/' + user.confirmationToken;

        emailNotification.name = "Forgot Password";
        emailNotification.to = payload.email();
        emailNotification.subject = "Forgot Password";

        await Notificator.sendEmail(emailNotification, "auth/forgot_password.hbs", {urlConfirmationToken})

        // const eventHandler = EventHandler.getInstance();
        //
        // eventHandler.execute('userCreated', {name: "Nathan", email: "nata@hgmai.com"});

        return {message: "We've sent you an email"};
    }
}

export default ForgotPasswordUseCase;
