import { Response } from 'express';
import Transformer from "./Transformer";
import { inject, injectable } from "inversify";
import IFormatResponder from './IFormatResponder';
import { TYPES } from "../types";

@injectable()
class Responder
{
    @inject(TYPES.IFormatResponder)
    private formatResponder: IFormatResponder;

    public send(data: any, response: Response, status: number, transformer: Transformer = null)
    {
        if (!transformer) {
            return response.status(status).send(data);
        }

        data = transformer.handle(data);

        response.status(status).send(this.formatResponder.getFormatData(data));
    }

    public error(data: any, response: Response, status: number)
    {
        response.status(status).send(data);
    }
}

export default Responder;