import { EntitySchema } from 'typeorm';
import Role from '../../Domain/Entities/Role';

const RoleSchema = new EntitySchema<Role>({
    name: 'Role',
    target: Role,
    tableName: 'roles',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        slug: {
            type: String,
            unique: true
        },
        enable: {
            type: 'bool',
            default: true
        },
        ofSystem: {
            type: 'bool',
            default: false
        },
        permissions: {
            type: 'simple-array',
            nullable: true
        },
        createdAt: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true
        }
    },
    indices: [
        {
            name: 'id_role_1',
            unique: true,
            columns: ['_id']
        }
    ],
    uniques: [
        {
            name: 'unq_role_1',
            columns: ['_id']
        }
    ]
});

export default RoleSchema;
