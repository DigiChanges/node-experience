interface UserRepPayload {
    firstName(): string;
    lastName(): string;
    email(): string;
    password(): string;
    passwordConfirmation(): string;
    enable(): boolean;
    roles(): any[];
    permissions(): any[];
    confirmationToken(): null;
    passwordRequestedAt(): null;
}

export default UserRepPayload