class ValidateUserLogin {

    protected email: string;
    protected password: string;

    protected emailError: string | undefined;
    protected passwordError: string | undefined;

    constructor(data: { email: string, password: string }) {
        this.email = data.email;
        this.password = data.password;
    }

    public validateInformation(): ValidatedUser {
        this.emailError = this.validateEmail();
        this.passwordError = this.validatePassword();

        if (this.passwordError === undefined &&
            this.emailError === undefined) {
            return {
                status: true
            };
        } else {
            return {
                status: false,
                emailError: this.emailError,
                passwordError: this.passwordError,
            };
        }
    }

    protected validateEmail(): string | undefined {
        const validated = true;

        if (validated === true) return undefined;
        return "Email Error";
    }

    protected validatePassword(): string | undefined {
        const validated = true;

        if (validated === true) return undefined;
        return "Password Error";
    }
}

export = ValidateUserLogin
