
class UserCreatedEvent
{
    public static USER_CREATED_EVENT: string = "USER_CREATED_EVENT";

    public static userCreatedListener = (props: any) =>
    {
        const { email } = props;

        console.log(`User ${email} Created!`);
    }
}

export default UserCreatedEvent;