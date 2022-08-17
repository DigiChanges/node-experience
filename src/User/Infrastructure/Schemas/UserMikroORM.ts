import { EntitySchema } from '@mikro-orm/core';
import User from '../../Domain/Entities/User';

const UserSchema = new EntitySchema<User>({
    name: 'User',
    tableName: 'users',
    class: User,
    indexes: [{ name: 'id_user_1', properties: '_id' }],
    uniques: [{ name: 'unq_user_1', properties: ['_id', 'email'] }],
    properties: {
        _id: {
            type: 'uuid',
            defaultRaw: 'uuid_generate_v4()',
            primary: true,
            unique: true
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string',
            unique: true
        },
        birthday: {
            type: 'Date'
        },
        documentType: {
            type: 'string'
        },
        documentNumber: {
            type: 'string',
            unique: true
        },
        gender: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        country: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        permissions: {
            type: 'json',
            nullable: true
        },
        enable: {
            type: 'boolean',
            default: true
        },
        verify: {
            type: 'boolean',
            default: false
        },
        isSuperAdmin: {
            type: 'boolean',
            default: false
        },
        passwordRequestedAt: {
            type: 'Date',
            nullable: true
        },
        roles: {
            reference: 'm:n',
            entity: 'Role',
            fixedOrder: true,
            pivotTable: 'users_has_roles',
            lazy: false
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

export default UserSchema;
