import {Response, Request} from 'express';
import {inject, injectable} from 'inversify';
import {IHttpStatusCode, IPaginator, Transformer} from '@digichanges/shared-experience';

import IFormatResponder from '../../InterfaceAdapters/Shared/IFormatResponder';
import {TYPES} from '../../types';
import PaginatorTransformer from './PaginatorTransformer';
import IFileDTO from '../../InterfaceAdapters/Payloads/FileSystem/IFileDTO';

@injectable()
class Responder
{
    @inject(TYPES.IFormatResponder)
    private formatResponder: IFormatResponder;

    public send(data: any, request: Request | any, response: Response, status: IHttpStatusCode, transformer: Transformer = null)
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
            return response.status(status.code).send({...data, metadata});
        }

        data = transformer.handle(data);

        response.status(status.code).send(this.formatResponder.getFormatData(data, status, metadata));
    }

    // TODO: Refactor to encapsulate this logic
    public async paginate(paginator: IPaginator, request: Request | any, response: Response, status: IHttpStatusCode, transformer: Transformer = null)
    {
        let metadata = null;
        const data = await paginator.paginate();

        if (request)
        {
            metadata = {};
        }

        const result = this.formatResponder.getFormatData(data, status, metadata);

        if (!transformer)
        {
            return response.status(status.code).send({...data, metadata});
        }

        result.data = transformer.handle(data);

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            paginator = paginatorTransformer.handle(paginator);

            const pagination = {'pagination': paginator};

            Object.assign(result, pagination);
        }

        response.status(status.code).send(result);
    }

    public sendStream(fileDto: IFileDTO, request: Request | any, response: Response, status: IHttpStatusCode)
    {
        response.writeHead(status.code, {'Content-Type': fileDto.metadata.mimeType});

        fileDto.stream.pipe(response);
    }

    public render(data: any, view: any, response: Response, resolve: any, reject: any)
    {
        response.render('log', {data}, (err: any, compiled: any) =>
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

    public error(data: any, request: Request | any, response: Response, status: any)
    {
        let metadata;

        if (request)
        {
            metadata = {
                refreshToken: request.refreshToken
            };
        }

        response.status(status.code).send({...data, metadata});
    }
}

export default Responder;
