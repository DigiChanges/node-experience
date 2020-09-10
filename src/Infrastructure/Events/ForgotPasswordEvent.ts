import Notificator from "../Notifications/Notificator";

class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT: string = "FORGOT_PASSWORD_EVENT";

    public static forgotPasswordListener = (props: any) =>
    {
        const {emailNotification, urlConfirmationToken} = props;

        Notificator
            .sendEmail(emailNotification, "auth/forgot_password.hbs", {urlConfirmationToken})
            .then((success) => success )
            .catch((error: any) => { throw Error("Error To send Notification Forgot Password") });
    }
}

export default ForgotPasswordEvent;