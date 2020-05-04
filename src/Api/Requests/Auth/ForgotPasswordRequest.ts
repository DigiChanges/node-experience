// @ts-ignore
import moment from "moment";
import * as express from "express";
import ForgotPasswordPayload from "../../../Payloads/Auth/ForgotPasswordPayload";
import IEncription from "../../../Lib/Encription/IEncription"
import {body} from "express-validator";
import container from "../../../inversify.config";

class ForgotPasswordRequest implements ForgotPasswordPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    email(): string
    {
        return this.request.body.email;
    }

    async confirmationToken(): Promise<string>
    { 
        let encription: IEncription = container.get<IEncription>("IEncription");
        let stringToEncrypt = this.email() + moment().utc().unix();
                
        return await encription.encrypt(stringToEncrypt);
    }

    passwordRequestedAT(): Date
    {
        return moment().toDate();
    }

    static validate()
    {
        return [
            body('email')
                .exists().withMessage('email must exist')
                .isEmail().withMessage('email must be of type string')
        ];
    }

}

export default ForgotPasswordRequest