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
    isSuperAdmin(): boolean;
}

export default UserRepPayload