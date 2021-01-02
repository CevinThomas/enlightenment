const config = require("../../auth/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class User {
  private readonly name: string;
  private readonly email: string;
  private password: string;
  private readonly licenceId: string;
  private passwordsMatch: boolean | undefined;
  private signedToken: any;
  private role: string;
  private results: Array<any>;

  constructor(data: {
    name: string;
    email: string;
    password: string;
    licenceId: string;
    role: string;
    results: Array<any>;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.licenceId = data.licenceId;
    this.role = data.role;
    this.results = [];
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, config.saltRounds);
  }

  public generateToken() {
    this.signedToken = jwt.sign(this.email, config.jwtSecret);
  }

  public getUsedCredentials() {
    return {
      name: this.name,
      email: this.email,
      token: this.signedToken,
      role: this.role,
    };
  }

  public doPasswordsMatch(incomingPassword: string) {
    if (!bcrypt.compareSync(incomingPassword || "", this.password))
      return (this.passwordsMatch = false);
    return (this.passwordsMatch = true);
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getLicenceId() {
    return this.licenceId;
  }
}

export = User;
