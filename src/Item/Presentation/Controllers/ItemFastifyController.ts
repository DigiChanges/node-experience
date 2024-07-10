import { FastifyReply, FastifyRequest } from 'fastify';
import { ParsedQs } from 'qs';

import FastifyResponder from '../../../Main/Presentation/Utils/FastifyResponder';
import ItemTransformer from '../Transformers/ItemTransformer';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import Pagination from '../../../Shared/Utils/Pagination';
import { IRequestFastify } from '../../../Shared/Utils/types';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';
import { DefaultMessageTransformer } from '../../../Main/Presentation/Transformers';
import { ResponseMessageEnum } from '../../../Main/Presentation/Utils/ResponseMessageEnum';
import { ICriteria, RequestCriteria } from '../../../Main/Domain/Criteria';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';

const responder: FastifyResponder = new FastifyResponder();

class ItemController
{
    static async save(request: FastifyRequest<IRequestFastify<ItemRepPayload>>, reply: FastifyReply): Promise<void>
    {
        const payload = {
            ...request.body
        };

        const useCase = DependencyInjector.inject<SaveItemUseCase>('SaveItemUseCase');
        const item = await useCase.handle(payload);

        await responder.send(item, reply, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    static async list(request: FastifyRequest<IRequestFastify>, reply: FastifyReply): Promise<void>
    {
        const { url } = request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new ItemFilter(request.query as ParsedQs),
            sort: new ItemSort(request.query as ParsedQs),
            pagination: new Pagination(request.query as ParsedQs, url)
        });

        const useCase = DependencyInjector.inject<ListItemsUseCase>('ListItemsUseCase');
        const data: any = await useCase.handle(requestCriteria);

        await responder.paginate(data, reply, StatusCode.HTTP_OK, new ItemTransformer());
    }

    static async show(request: FastifyRequest, reply: FastifyReply): Promise<void>
    {
        const useCase = DependencyInjector.inject<GetItemUseCase>('GetItemUseCase');
        const item = await useCase.handle(request.params as IdPayload);

        await responder.send(item, reply, StatusCode.HTTP_OK, new ItemTransformer());
    }

    static async update(request: FastifyRequest<IRequestFastify<ItemUpdatePayload>>, reply: FastifyReply): Promise<void>
    {
        const payload = {
            id: (request.params as IdPayload).id,
            ...request.body
        };

        const useCase = DependencyInjector.inject<UpdateItemUseCase>('UpdateItemUseCase');
        const item = await useCase.handle(payload);

        await responder.send(item, reply, StatusCode.HTTP_OK, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async remove(request: FastifyRequest<IRequestFastify>, reply: FastifyReply): Promise<void>
    {
        const useCase = DependencyInjector.inject<RemoveItemUseCase>('RemoveItemUseCase');
        const item = await useCase.handle(request.params as IdPayload);

        await responder.send(item, reply, StatusCode.HTTP_OK, new ItemTransformer());
    }
}

export default ItemController;
