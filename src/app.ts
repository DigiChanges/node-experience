import "reflect-metadata";
import * as bodyParser from "body-parser";
import {LoggerRoutes} from "./Middlewares/LoggerRoutes";
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
import AuthMiddleware from "./Middlewares/AuthMiddleware";

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
        this.server.setConfig((app) =>
        {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(LoggerRoutes.log);
            app.use(compression());
            app.use(cors());
            app.use(helmet());
            app.use(AuthMiddleware);

        });
        this.server.setErrorConfig((app) =>
        {
            app.use(ErrorHandler.handle);
        });

        const serverInstance = await this.server.build();
        serverInstance.listen(this.port, () => {
                console.log(`App listening on the port ${this.port}`);
        });
    }
}
export default App;