import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { orm } from '../Infrastructure/Database/CreateMikroORMConnection'; // TODO: Refactor

class EntityMikroORMManagerFactory
{
    public static getEntityFactory(): EntityManager
    {
        // @ts-ignore
        let rem = RequestContext.getEntityManager() as EntityManager;

        if (!rem)
        {
            rem = orm.em as EntityManager;
        }

        return rem;
    }
}

export default EntityMikroORMManagerFactory;
