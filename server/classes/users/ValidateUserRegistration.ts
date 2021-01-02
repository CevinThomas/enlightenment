import ValidateUserLogin from "./ValidateUserLogin";

class ValidateUserRegistration extends ValidateUserLogin {
  private name: string;
  private licenceId: string;

  private nameError: string | undefined;
  private licenceIdError: string | undefined;
  private results: Array<any> | undefined;
  private invites: Array<any> | undefined;

  constructor(data: {
    name: string;
    email: string;
    password: string;
    licenceId: string;
    results: Array<any>;
    invites: Array<any>;
  }) {
    super({ email: data.email, password: data.password });
    this.name = data.name;
    this.licenceId = data.licenceId;
  }

  public validateInformation(): ValidatedUser {
    this.nameError = this.validateName();
    this.licenceIdError = this.validateLicenceId();
    this.passwordError = this.validatePassword();
    this.emailError = this.validateEmail();

    if (
      this.nameError === undefined &&
      this.licenceIdError === undefined &&
      this.passwordError === undefined &&
      this.emailError === undefined
    ) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        nameError: this.nameError,
        emailError: this.emailError,
        passwordError: this.passwordError,
        licenceIdError: this.licenceIdError,
      };
    }
  }

  private validateName(): string | undefined {
    const validated = true;

    if (validated === true) return undefined;
    return "Name Error";
  }

  private validateLicenceId(): string | undefined {
    const validated = true;

    if (validated === true) return undefined;
    return "Licence Error";
  }
}

export = ValidateUserRegistration;
