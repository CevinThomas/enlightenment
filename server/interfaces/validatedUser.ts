interface ValidatedUser {
    nameError?: string | undefined;
    emailError?: string | undefined;
    passwordError?: string | undefined;
    licenceIdError?: string | undefined;
    status: boolean;
}
