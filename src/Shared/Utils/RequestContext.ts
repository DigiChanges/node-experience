import asyncHooks from 'async_hooks';
import nanoId from 'nanoid';
import { DependencyContainer } from 'tsyringe';
import rContainer from '../../register';

const store = new Map();

const asyncHook = asyncHooks.createHook({
    init: (asyncId, _, triggerAsyncId) =>
    {
        if (store.has(triggerAsyncId))
        {
            store.set(asyncId, store.get(triggerAsyncId));
        }
    },
    destroy: (asyncId) =>
    {
        if (store.has(asyncId))
        {
            store.delete(asyncId);
        }
    }
});

asyncHook.enable();

export const createRequestContext = (container: DependencyContainer, requestId = nanoId.nanoid()) =>
{
    store.clear();
    const requestInfo = { requestId, container };
    store.set(asyncHooks.executionAsyncId(), requestInfo);

    return requestInfo;
};

export const getRequestContext = (): { requestId: string, container?: DependencyContainer } =>
{
    const data = store.get(asyncHooks.executionAsyncId());
    const container = data?.container ?? rContainer;

    return { ...data, container };
};

