import * as express from "express";
import AuthPayload from "../../Payloads/Auth/AuthPayload";
import IToken from "../../../Lib/Auth/IToken";
import KeepAlivePayload from "../../Payloads/Auth/KeepAlivePayload";
import ForgotPasswordPayload from "../../Payloads/Auth/ForgotPasswordPayload";
import ChangeForgotPasswordPayload from "../../Payloads/Auth/ChangeForgotPasswordPayload";

interface IAuthService
{
    login (payload: AuthPayload): Promise<IToken>
    decodeToken (token: string): any;
    getLoggedId(request: express.Request): string;
    getLoggedEmail(request: express.Request): string;
    regenerateToken (request: KeepAlivePayload): Promise<IToken>;
    forgotPassword (payload: ForgotPasswordPayload): Promise<any>;
    changeForgotPassword (payload: ChangeForgotPasswordPayload): Promise<any>;
}

export default IAuthService;