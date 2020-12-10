import { Response, Request } from 'express';
import Transformer from "./Transformer";
import { inject, injectable } from "inversify";
import IFormatResponder from '../../InterfaceAdapters/Shared/IFormatResponder';
import { TYPES } from "../../types";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import PaginatorTransformer from "./PaginatorTransformer";
import IFileDTO from '../../InterfaceAdapters/Payloads/FileSystem/IFileDTO';
import IHttpStatusCode from "../../InterfaceAdapters/Shared/IHttpStatusCode";

@injectable()
class Responder
{
    @inject(TYPES.IFormatResponder)
    private formatResponder: IFormatResponder;

    public send(data: any, request: Request | any, response: Response, status: IHttpStatusCode, transformer: Transformer = null)
    {
        let metadata = null;

        if (!transformer)
        {
            return response.status(status.code).send(data);
        }

        data = transformer.handle(data);

        if (request)
        {
            metadata = {
                refreshToken: request.refreshToken
            }
        }

        response.status(status.code).send(this.formatResponder.getFormatData(data, status, metadata));
    }

    // TODO: Refactor to encapsulate this logic
    public async paginate(paginator: IPaginator, request: Request | any, response: Response, status: IHttpStatusCode, transformer: Transformer = null)
    {
        let metadata = null;
        let data = await paginator.paginate();

        if (request)
        {
            metadata = {
                refreshToken: request.refreshToken
            }
        }

        let result = this.formatResponder.getFormatData(data, status, metadata)

        if (!transformer)
        {
            return response.status(status.code).send(result);
        }

        result.data = transformer.handle(data);

        if (paginator.getExist())
        {
            let paginatorTransformer = new PaginatorTransformer();
            paginator = paginatorTransformer.handle(paginator);

            let pagination = { 'pagination': paginator };

            Object.assign(result, pagination);
        }

        await response.status(status.code).send(result);
    }

    public sendStream(fileDto: IFileDTO, response: Response, status: IHttpStatusCode)
    {
        response.writeHead(status.code, {'Content-Type': fileDto.metadata.mimeType });

        fileDto.stream.pipe(response);
    }

    public error(data: any, response: Response, status: any)
    {
        response.status(status.code).send(data);
    }
}

export default Responder;
