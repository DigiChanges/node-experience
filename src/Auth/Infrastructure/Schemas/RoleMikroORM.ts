import { EntitySchema } from '@mikro-orm/core';
import Role from '../../Domain/Entities/Role';

const RoleSchema = new EntitySchema<Role>({
    name: 'Role',
    tableName: 'roles',
    class: Role,
    indexes: [{ name: 'id_role_1', properties: '_id' }],
    uniques: [{ name: 'unq_role_1', properties: ['_id', 'slug'] }],
    properties: {
        _id: {
            type: 'uuid',
            defaultRaw: 'uuid_generate_v4()',
            primary: true,
            unique: true
        },
        name: {
            type: 'string'
        },
        slug: {
            type: 'string',
            unique: true
        },
        enable: {
            type: 'boolean',
            default: true
        },
        ofSystem: {
            type: 'boolean',
            default: false
        },
        permissions: {
            type: 'json',
            nullable: true
        },
        createdAt: {
            type: 'Date',
            onCreate: () => new Date(), nullable: true
        },
        updatedAt: {
            type: 'Date',
            onCreate: () => new Date(),
            onUpdate: () => new Date(), nullable: true
        }
    }
});

export default RoleSchema;
