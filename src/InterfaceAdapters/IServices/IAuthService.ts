import * as express from "express";

interface IAuthService
{
    decodeToken (token: string): any; // TODO: Add type
    getLoggedId(request: express.Request): any;
    getLoggedEmail(request: express.Request): any;
}

export default IAuthService;
