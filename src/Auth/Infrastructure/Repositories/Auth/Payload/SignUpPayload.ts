interface SignUpPayload
{
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    password: string;
    passwordConfirmation: string;
    genre?: string;
    country?: string;
    phone?: string;
}

export default SignUpPayload;
