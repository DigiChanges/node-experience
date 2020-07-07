import * as express from "express";

interface IAuthService
{
    decodeToken (token: string): any;
    getLoggedId(request: express.Request): string;
    getLoggedEmail(request: express.Request): string;
}

export default IAuthService;