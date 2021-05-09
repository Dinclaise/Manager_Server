import * as Nedb from "nedb";
import { SessionToken } from "../Server/Model";
import { logInvocation } from "../Shared/MethodDecorators";

export class SessionTokenDBAccess {
  private nedb: Nedb;

  constructor() {
    this.nedb = new Nedb("database/SessionToken.db");
    this.nedb.loadDatabase();
  }

  @logInvocation
  public async storeSessionToken(token: SessionToken): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(token, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  @logInvocation
  public async getToken(tokenId: string): Promise<SessionToken | undefined> {
    return new Promise((resolve, reject) => {
      this.nedb.find({ tokenId: tokenId }, (err: Error, docs: any) => {
        if (err) {
          reject(err);
        } else {
          if (docs.length === 0) {
            resolve(undefined);
          } else {
            resolve(docs[0]);
          }
        }
      });
    });
  }
}
