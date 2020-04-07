interface UserRepPayload {
    email(): string;
    password(): string;
    passwordConfirmation(): string;
    enable(): boolean;
}

export default UserRepPayload