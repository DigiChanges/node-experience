import { Response } from 'express';
import Transformer from "./Transformer";
import { inject, injectable } from "inversify";
import IFormatResponder from './IFormatResponder';
import { TYPES } from "../types";
import IPaginator from "./Contracts/IPaginator";
import PaginatorTransformer from "./Transformers/PaginatorTransformer";

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

    public async paginate(paginator: IPaginator, response: Response, status: number, transformer: Transformer = null)
    {
        let data = await paginator.paginate();

        if (!transformer) {
            return response.status(status).send(data);
        }

        let paginatorTransformer = new PaginatorTransformer();
        paginator = paginatorTransformer.handle(paginator);

        const result = {
            'data': data,
            'pagination': paginator
        };

        await response.status(status).send(result);
    }

    public error(data: any, response: Response, status: number)
    {
        response.status(status).send(data);
    }
}

export default Responder;