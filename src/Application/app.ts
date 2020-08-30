import "reflect-metadata";
import * as bodyParser from "body-parser";
import {InversifyExpressServer} from "inversify-express-utils";
import Container from "../inversify.config";
import "../Presentation/Handlers/ItemHandler";
import "../Presentation/Handlers/UserHandler";
import "../Presentation/Handlers/AuthHandler";
import "../Presentation/Handlers/RoleHandler";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import Config from "config";
import LoggerWinston from "../Presentation/Middlewares/LoggerWinston";
import AuthenticationMiddleware from "../Presentation/Middlewares/AuthenticationMiddleware";
import {ErrorHandler} from "../Presentation/Shared/ErrorHandler";
import {loggerCli} from "../Infrastructure/Shared/Logger";


class App
{
    public port?: number;
    private server: InversifyExpressServer;

    constructor()
    {
        this.port = (Config.get('serverPort') || 8090); // default port to listen;
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
            // app.use(AuthenticationMiddleware);
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
