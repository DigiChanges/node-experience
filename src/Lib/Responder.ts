import { Response } from 'express';
import Transformer from "./Transformer";
import { inject, injectable } from "inversify";
import IFormatResponder from './IFormatResponder';
import { TYPES } from "../types";

@injectable()
class Responder
{
    private formatResponder: IFormatResponder;

    constructor(@inject(TYPES.IFormatResponder) formatResponder: IFormatResponder)
    {
        this.formatResponder = formatResponder;
    }

    public send(data: any, response: Response, status: number, transformer: Transformer)
    {
        if (data instanceof Array) {

            data = data.map((element: any) => {
                return transformer.transform(element);
            });
        }
        else
        {
            data = transformer.transform(data);
        }

        response.status(status).send(this.formatResponder.getFormatData(data));
    }
}

export default Responder;