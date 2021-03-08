import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { UsersDBAccess } from "../User/UserDBAccess";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Handler } from "./Model";
import { Utils } from "./Utils";

export class UsersHandler extends BaseRequestHandler {
  private usersDBAccess: UsersDBAccess = new UsersDBAccess();

  constructor(req: IncomingMessage, res: ServerResponse) {
    super(req, res);
  }

  async handleRequest(): Promise<void> {
    switch (this.req.method) {
      case HTTP_METHODS.GET:
        await this.handleGet();
        break;

      default:
        this.handleNotFound();
        break;
    }
  }

  private async handleGet() {
    const parsedUrl = Utils.getUrlParameters(this.req.url);

    if (parsedUrl) {
      const userId = parsedUrl.query.id;
      if (userId) {
        const user = await this.usersDBAccess.getUserById(userId as string);
        if (user) {
          this.respondJsonObject(HTTP_CODES.OK, user);
        } else {
          this.handleNotFound();
        }
      } else {
        this.respondBadRequest("userId not present in request");
      }
    }
  }
}
