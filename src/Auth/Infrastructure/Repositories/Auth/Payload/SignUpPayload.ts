interface SignUpPayload
{
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    password: string;
    passwordConfirmation: string;
    genre?: string;
    country?: string;
    phone?: string;
}

export default SignUpPayload;
