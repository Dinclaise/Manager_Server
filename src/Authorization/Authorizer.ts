import { Account, SessionToken, TokenGenerator } from "../Server/Model";

export class Authorizer implements TokenGenerator {
  async generateToken(account: Account): Promise<SessionToken | undefined> {
    if (account.username === "abcd" && account.password === "1234") {
      return {
        tokenId: "someTokeId",
      };
    } else {
      return undefined;
    }
  }
}
