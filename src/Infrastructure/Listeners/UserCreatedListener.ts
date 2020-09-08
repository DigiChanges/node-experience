
const UserCreatedListener = (props: any) =>
{
    const { email } = props;

    console.log(`User ${email} Created!`);
}

export default UserCreatedListener;