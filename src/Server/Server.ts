import { createServer, IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../Authorization/Authorizer";
import { Monitor } from "../Shared/ObjectsCounter";
import { LoginHandler } from "./LoginHandler";
import { UsersHandler } from "./UsersHandler";
import { Utils } from "./Utils";

export class Server {
  private authorizer: Authorizer = new Authorizer();

  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      console.log("got request from: " + req.url);
      this.addCorsHeader(res);
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case "systemInfo":
          res.write(Monitor.printInstance());
          break;
        case "login":
          await new LoginHandler(req, res, this.authorizer).handleRequest();
          break;
        case "users":
          await new UsersHandler(req, res, this.authorizer).handleRequest();
          break;
        default:
          break;
      }
      res.end();
    }).listen(8080);
    console.log("server started");
  }

  private addCorsHeader(res: ServerResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
  }
}
