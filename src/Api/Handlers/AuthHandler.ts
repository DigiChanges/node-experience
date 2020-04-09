import {NextFunction, Request, Response} from 'express';
import { inject } from 'inversify'
import { TYPES } from "../../types";
import Responder from "../../Lib/Responder";
import UserService from '../../Services/UserService';
import {controller, httpGet, httpPost, request, response, next} from 'inversify-express-utils';
import passport from "passport";
import moment from "moment";
import {Strategy, ExtractJwt, VerifiedCallback} from "passport-jwt";
import AuthPayload from "../../Payloads/Auth/AuthPayload";
import ItemRepRequest from "../Requests/Items/ItemRepRequest";
import AuthRequest from "../Requests/Auth/AuthRequest";
import AuthService from "../../Services/AuthService";
// const LocalStrategy = passportLocal.Strategy;
// const JwtStrategy = passportJwt.Strategy;
// const ExtractJwt = passportJwt.ExtractJwt;
import config from "../../../config/config";
import StatusCode from "../../Lib/StatusCode";
import AuthTransformer from "../Transformers/Auth/AuthTransformer";

// passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) =>
// {
//     const service = new UserService();
//
//     User.findOne({ username: username.toLowerCase() }, (err, user: any) => {
//         if (err) { return done(err); }
//         if (!user) {
//             return done(undefined, false, { message: `username ${username} not found.` });
//         }
//         user.comparePassword(password, (err: Error, isMatch: boolean) => {
//             if (err) { return done(err); }
//             if (isMatch) {
//                 return done(undefined, user);
//             }
//             return done(undefined, false, { message: "Invalid username or password." });
//         });
//     });
// }));

@controller('/api/auth')
class AuthHandler
{
    @inject(AuthService)
    private service: AuthService;
    private responder: Responder;

    constructor(@inject(TYPES.Responder) responder: Responder)
    {
        this.responder = responder;
    }

    public initialize()
    {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback: any) => passport.authenticate("jwt", {session: false, failWithError:true}, callback);

    @httpPost('/login',)
    public async login (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const authRequest = new AuthRequest(req);

        const payload = await this.service.login(authRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, (req: any, payload: any, done:VerifiedCallback) => {
            // User.findOne({ "username": payload.username }, (err: any, user: any) => {
            //     /* istanbul ignore next: passport response */
            //     if (err) {
            //         return done(err);
            //     }
            //     /* istanbul ignore next: passport response */
            //     if (user === null) {
            //         return done(null, false, { message: "The user in the token was not found" });
            //     }
            //
            //     return done(null, { _id: user._id, username: user.username });
            // });
        });
    }


    // @httpGet('/loguot')
    // public async list (@request() req: Request, @response() res: Response)
    // {
        // const userRequest = new UserRequestCriteria(req);
        // const paginator = await this.service.list(userRequest);
        //
        // await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new UserTransformer());
    // }
}

export default AuthHandler;
