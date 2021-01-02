const jwt = require("jsonwebtoken");
const config = require("../auth/config");

class Authentication {
  private readonly tokenFromRequest: string;
  private validatedMessage: string | boolean | undefined;
  public usersEmailFromToken: string;

  constructor(token: string) {
    this.usersEmailFromToken = "";
    this.tokenFromRequest = token;
  }

  public getUserFromToken() {
    return this.usersEmailFromToken;
  }

  public validateToken() {
    if (!this.tokenFromRequest)
      return (this.validatedMessage = "No token found");
    if (this.tokenFromRequest.includes("Bearer")) {
      const splittedToken = this.tokenFromRequest.split("Bearer ")[1];
      jwt.verify(splittedToken, config.jwtSecret, (err: any, decoded: any) => {
        if (err) return (this.validatedMessage = "Unauthorized");
        this.usersEmailFromToken = decoded;
        return (this.validatedMessage = "Success");
      });
    } else {
      jwt.verify(
        this.tokenFromRequest,
        config.jwtSecret,
        (err: any, decoded: string) => {
          if (err) return (this.validatedMessage = "Unauthorized");
          this.usersEmailFromToken = decoded;
          return (this.validatedMessage = "Success");
        }
      );
    }
  }

  public getValidateMessage() {
    return this.validatedMessage;
  }
}

export = Authentication;
