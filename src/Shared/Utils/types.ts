import { ParsedQs } from 'qs';
import { RouteGenericInterface } from 'fastify';

export interface IRequest<T = null, P = null>
{
    body?: T;
    url?: string;
    query?: ParsedQs;
    params?: P;
}

export interface IRequestFastify<T = null> extends RouteGenericInterface
{
    Body?: T;
}
