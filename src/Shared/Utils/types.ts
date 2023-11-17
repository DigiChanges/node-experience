import { RouteGenericInterface } from 'fastify';

export interface IRequestFastify<T = null> extends RouteGenericInterface
{
    Body?: T;
}
