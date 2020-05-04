import "reflect-metadata";
import * as bodyParser from "body-parser";
import {InversifyExpressServer} from "inversify-express-utils";
import Container from "./inversify.config";
import "./Api/Handlers/ItemHandler";
import "./Api/Handlers/UserHandler";
import "./Api/Handlers/AuthHandler";
import "./Api/Handlers/RoleHandler";
import {ErrorHandler} from "./Lib/ErrorHandler";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import config from "../config/config";
import AuthenticationMiddleware from "./Middlewares/AuthenticationMiddleware";
import LoggerWinston from "./Middlewares/LoggerWinston";
import {loggerCli} from "./Lib/Logger";

class App
{
    public port?: number;
    private server: InversifyExpressServer;

    constructor()
    {
        this.port = Number(config.serverPort || 8090); // default port to listen;
        this.server = new InversifyExpressServer(Container);
    }

    public async listen()
    {
        this.server.setConfig((app: any) =>
        {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(compression());
            app.use(cors());
            app.use(helmet());
            app.use(LoggerWinston);
            app.use(AuthenticationMiddleware);
        });
        this.server.setErrorConfig((app: any) =>
        {
            app.use(ErrorHandler.handle);
        });

        const serverInstance = await this.server.build();
        serverInstance.listen(this.port, () => {
            loggerCli.debug(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
