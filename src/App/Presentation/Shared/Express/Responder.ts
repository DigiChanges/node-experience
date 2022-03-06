import { Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import {
    IHttpStatusCode,
    IPaginator,
    PaginatorTransformer,
    Transformer
} from '@digichanges/shared-experience';
import { TYPES } from '../../../../Config/Injects/types';
import IFileDTO from '../../../../File/Domain/Models/IFileDTO';
import IFormatResponder from '../../../../Shared/InterfaceAdapters/IFormatResponder';

@injectable()
class Responder
{
    @inject(TYPES.IFormatResponder)
    private formatResponder: IFormatResponder;

    public async send(data: any, request: Request | any, response: Response, status: IHttpStatusCode, transformer: Transformer = null)
    {
        let metadata = null;

        if (request)
        {
            metadata = {
                refreshToken: request.refreshToken
            };
        }

        if (!transformer)
        {
            return response.status(status.code).send({ data: { ...data, metadata } });
        }

        data = await transformer.handle(data);

        response.status(status.code).send(this.formatResponder.getFormatData(data, status, metadata));
    }

    // TODO: Refactor to encapsulate this logic
    public async paginate(paginator: IPaginator, request: Request | any, response: Response, status: IHttpStatusCode, transformer: Transformer = null)
    {
        const data = await paginator.paginate();
        const metadata = paginator.getMetadata();
        const result = this.formatResponder.getFormatData(data, status, metadata);

        if (!transformer)
        {
            return response.status(status.code)
                .send({
                    data,
                    metadata
                });
        }

        result.data = await transformer.handle(data);

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            paginator = await paginatorTransformer.handle(paginator);

            const pagination = { pagination: paginator };

            Object.assign(result, pagination);
        }

        response.status(status.code).send(result);
    }

    public sendStream(fileDto: IFileDTO, request: Request | any, response: Response, status: IHttpStatusCode)
    {
        response.writeHead(status.code, { 'Content-Type': fileDto.metadata.mimeType });

        fileDto.stream.pipe(response);
    }

    public render(data: any, view: any, response: Response, resolve: any, reject: any)
    {
        response.render('log', { data }, (err: any, compiled: any) =>
        {
            if (err)
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                reject('500 when rendering the template');
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            resolve(compiled);
        });
    }

    public error(data: any, request: Request | any, response: Response, status: any, metadata: Record<string, any>)
    {
        if (request)
        {
            metadata = {
                ...metadata,
                refreshToken: request.refreshToken
            };
        }

        response.status(status.code).send({ ...data, metadata });
    }
}

export default Responder;
