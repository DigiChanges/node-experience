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

    public send(data: any, response: Response, status: any, transformer: Transformer = null)
    {
        if (!transformer) {
            return response.status(status.code).send(data);
        }

        data = transformer.handle(data);

        response.status(status.code).send(this.formatResponder.getFormatData(data, status));
    }

    // TODO: Refactor to encapsulate this logic
    public async paginate(paginator: IPaginator, response: Response, status: any, transformer: Transformer = null)
    {
        let data = await paginator.paginate();

        let result = this.formatResponder.getFormatData(data, status)

        if (!transformer)
        {
            return response.status(status.code).send(result);
        }

        result.data = transformer.handle(data);

        if (paginator.getExist())
        {
            let paginatorTransformer = new PaginatorTransformer();
            paginator = paginatorTransformer.handle(paginator);

            let pagination = {
              'pagination': paginator
            };

            Object.assign(result, pagination);
        }

        await response.status(status.code).send(result);
    }

    public error(data: any, response: Response, status: any)
    {
        response.status(status.code).send(data);
    }
}

export default Responder;